import { Module } from '@nestjs/common';
import { StationsModule } from '../stations/stations.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [StationsModule],
  providers: [SeedService],
  controllers: [SeedController], // Añadir el controlador aquí
})
export class SeedModule {}
