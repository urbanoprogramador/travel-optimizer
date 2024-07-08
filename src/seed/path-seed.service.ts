import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Path } from '../paths/entities/path.entity';
import { StationsService } from '../stations/stations.service';
import { PathsService } from '../paths/paths.service';

@Injectable()
export class PathSeedService {
  private readonly logger = new Logger(PathSeedService.name);

  constructor(
    private readonly pathsService: PathsService,
    private readonly stationsService: StationsService,
  ) {}

  async run() {
    if (!this.hasStations()) {
      this.logger.error('No stations found. Seed paths aborted.');
      throw new NotFoundException('No stations found.');
    }

    if (await this.hasData()) {
      this.logger.log('Paths already seeded');
      return { status: 'already_seeded' };
    }

    await this.seedPaths();
    this.logger.log('Paths seeded successfully');
    return { status: 'seeded' };
  }

  private async seedPaths() {
    const paths = [
      new Path(1, 10, 11, 50),
      new Path(2, 10, 12, 100),
      new Path(3, 10, 13, 60),
      new Path(4, 13, 12, 20),
    ];

    for (const path of paths) {
      this.pathsService.create(path);
    }

    this.logger.log('Paths seeded: ' + JSON.stringify(paths));
  }

  private async hasData(): Promise<boolean> {
    const paths = this.pathsService.findAll();
    return paths.length > 0;
  }

  private hasStations(): boolean {
    const stations = this.stationsService.findAll();
    return stations.length > 0;
  }
}
