import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StationsModule } from './stations/stations.module';
import { PathsModule } from './paths/paths.module';
import { SeedModule } from './seed/seed.module';
import { AppService } from './app.service';

@Module({
  imports: [StationsModule, PathsModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
