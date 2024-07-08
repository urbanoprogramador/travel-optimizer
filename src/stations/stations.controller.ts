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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('stations')
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Create or update a station' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the station' })
  @ApiResponse({
    status: 200,
    description: 'The station has been created/updated successfully',
    schema: { example: { status: 'ok' } },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() createStationDto: CreateStationDto,
  ) {
    const station = new Station(id, createStationDto.name);
    this.stationsService.create(station);
    return { status: 'ok' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all stations' })
  @ApiResponse({
    status: 200,
    description: 'List of all stations',
    schema: {
      example: [
        { id: 10, name: 'Barcelona' },
        { id: 11, name: 'Paris' },
      ],
    },
  })
  findAll(): Station[] {
    return this.stationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get station by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the station' })
  @ApiResponse({
    status: 200,
    description: 'The station details',
    schema: { example: { id: 10, name: 'Barcelona' } },
  })
  @ApiResponse({ status: 404, description: 'Station not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Station {
    return this.stationsService.findOne(id);
  }
}
