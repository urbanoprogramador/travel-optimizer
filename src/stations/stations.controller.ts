import {
  Controller,
  Put,
  Body,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { Station } from './entities/station.entity';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Put(':id')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() createStationDto: CreateStationDto,
  ) {
    const station = new Station(id, createStationDto.name);
    this.stationsService.create(station);
    return { status: 'ok' };
  }

  @Get()
  findAll(): Station[] {
    return this.stationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Station {
    return this.stationsService.findOne(id);
  }
}
