import { Controller, Get } from '@nestjs/common';
import { PathSeedService } from './path-seed.service';

@Controller('seed/paths')
export class PathSeedController {
  constructor(private readonly pathSeedService: PathSeedService) {}

  @Get()
  async seedPaths() {
    return this.pathSeedService.run();
  }
}
