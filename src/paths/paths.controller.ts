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

@Controller('paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @Put(':id')
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
  findOne(@Param('id', ParseIntPipe) id: number): Path {
    return this.pathsService.findOne(id);
  }

  @Get()
  findAll(): Path[] {
    return this.pathsService.findAll();
  }
}
