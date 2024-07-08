import { ApiProperty } from '@nestjs/swagger';

export class CreateStationDto {
  @ApiProperty({ example: 'Barcelona', description: 'The name of the station' })
  name: string;
}
