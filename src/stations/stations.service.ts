import { Injectable, NotFoundException } from '@nestjs/common';
import { Station } from './entities/station.entity';

@Injectable()
export class StationsService {
  private stations: Station[] = [];

  create(station: Station) {
    this.stations.push(station);
  }

  findAll(): Station[] {
    return this.stations;
  }

  findOne(id: number): Station {
    const station = this.stations.find((station) => station.id === id);
    if (!station) {
      throw new NotFoundException(`Station with ID ${id} not found`);
    }
    return station;
  }
}
