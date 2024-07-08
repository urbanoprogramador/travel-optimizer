import {
  Controller,
  Put,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { Path } from './entities/path.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('paths')
@Controller('paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Create or update a path' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the path' })
  @ApiResponse({
    status: 200,
    description: 'The path has been created/updated successfully',
    schema: { example: { status: 'ok' } },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPathDto: CreatePathDto,
  ) {
    const path = new Path(
      id,
      createPathDto.sourceId,
      createPathDto.destinationId,
      createPathDto.cost,
    );
    this.pathsService.create(path);
    return { status: 'ok' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get path by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID of the path' })
  @ApiResponse({
    status: 200,
    description: 'The path details',
    schema: { example: { id: 1, sourceId: 10, destinationId: 12, cost: 100 } },
  })
  @ApiResponse({ status: 404, description: 'Path not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Path {
    return this.pathsService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all paths' })
  @ApiResponse({
    status: 200,
    description: 'List of all paths',
    schema: {
      example: [{ id: 1, sourceId: 10, destinationId: 12, cost: 100 }],
    },
  })
  findAll(): Path[] {
    return this.pathsService.findAll();
  }

  @Get(':sourceId/:destinationId')
  @ApiOperation({ summary: 'Get the optimal path between two stations' })
  @ApiParam({
    name: 'sourceId',
    type: 'number',
    description: 'ID of the source station',
  })
  @ApiParam({
    name: 'destinationId',
    type: 'number',
    description: 'ID of the destination station',
  })
  @ApiResponse({
    status: 200,
    description: 'The optimal path between the stations',
    schema: { example: { path: [10, 13, 12], cost: 80 } },
  })
  @ApiResponse({ status: 404, description: 'Stations not found' })
  findOptimalPath(
    @Param('sourceId', ParseIntPipe) sourceId: number,
    @Param('destinationId', ParseIntPipe) destinationId: number,
  ) {
    return this.pathsService.findOptimalPath(sourceId, destinationId);
  }
}
