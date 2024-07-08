import { Module } from '@nestjs/common';
import { PathsController } from './paths.controller';
import { PathsService } from './paths.service';

@Module({
  controllers: [PathsController],
  providers: [PathsService]
})
export class PathsModule {}
