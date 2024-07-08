import { Injectable, NotFoundException } from '@nestjs/common';
import { StationsService } from '../stations/stations.service';
import { Path } from './entities/path.entity';

@Injectable()
export class PathsService {
  private paths: Path[] = [];

  constructor(private readonly stationsService: StationsService) {}

  create(path: Path) {
    this.paths.push(path);
  }

  findAll(): Path[] {
    return this.paths;
  }
  findOne(id: number): Path {
    const path = this.paths.find((path) => path.id === id);
    if (!path) {
      throw new NotFoundException(`Path with ID ${id} not found`);
    }
    return path;
  }
}
