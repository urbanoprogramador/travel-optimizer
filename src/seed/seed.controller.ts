import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Seed the database with initial station data' })
  @ApiResponse({ status: 200, description: 'Data seeded successfully' })
  @ApiResponse({ status: 400, description: 'Seeding failed' })
  @ApiResponse({ status: 200, description: 'Data already seeded' })
  async seed() {
    return this.seedService.run();
  }
}
