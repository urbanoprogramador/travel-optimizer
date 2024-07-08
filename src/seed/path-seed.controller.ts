import { Controller, Get } from '@nestjs/common';
import { PathSeedService } from './path-seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('seed-paths')
@Controller('seed/paths')
export class PathSeedController {
  constructor(private readonly pathSeedService: PathSeedService) {}

  @Get()
  @ApiOperation({ summary: 'Seed the database with initial paths data' })
  @ApiResponse({ status: 200, description: 'Paths data seeded successfully' })
  @ApiResponse({ status: 400, description: 'Seeding failed' })
  @ApiResponse({ status: 404, description: 'No stations found' })
  async seedPaths() {
    return this.pathSeedService.run();
  }
}
