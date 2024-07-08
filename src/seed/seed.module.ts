import { Module } from '@nestjs/common';
import { StationsModule } from '../stations/stations.module';
import { PathsModule } from '../paths/paths.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PathSeedService } from './path-seed.service';
import { PathSeedController } from './path-seed.controller';

@Module({
  imports: [StationsModule, PathsModule],
  providers: [SeedService, PathSeedService],
  controllers: [SeedController, PathSeedController],
})
export class SeedModule {}
