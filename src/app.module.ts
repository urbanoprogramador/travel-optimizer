import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationsModule } from './stations/stations.module';
import { PathsModule } from './paths/paths.module';

@Module({
  imports: [StationsModule, PathsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
