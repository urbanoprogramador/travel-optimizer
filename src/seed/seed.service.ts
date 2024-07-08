import { Injectable, Logger } from '@nestjs/common';
import { StationsService } from '../stations/stations.service';
import { Station } from '../stations/entities/station.entity';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly stationsService: StationsService) {}

  async run() {
    if (await this.hasData()) {
      this.logger.log('Data already seeded');
      return { status: 'already_seeded' };
    }
    await this.seedStations();
    this.logger.log('Data seeded successfully');
    return { status: 'seeded' };
  }

  private async seedStations() {
    const stations = [
      new Station(10, 'Barcelona'),
      new Station(11, 'Paris'),
      new Station(12, 'Berlin'),
      new Station(13, 'Roma'),
    ];

    for (const station of stations) {
      this.stationsService.create(station);
    }

    this.logger.log('Stations seeded: ' + JSON.stringify(stations));
  }

  private async hasData(): Promise<boolean> {
    const stations = this.stationsService.findAll();
    return stations.length > 0;
  }
}
