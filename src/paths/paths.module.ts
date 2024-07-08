import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { StationsModule } from '../stations/stations.module';

@Module({
  imports: [StationsModule],
  controllers: [PathsController],
  providers: [PathsService],
  exports: [PathsService],
})
export class PathsModule {}
