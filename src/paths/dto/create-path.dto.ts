import { ApiProperty } from '@nestjs/swagger';

export class CreatePathDto {
  @ApiProperty({ example: 10, description: 'Source station ID' })
  sourceId: number;

  @ApiProperty({ example: 12, description: 'Destination station ID' })
  destinationId: number;

  @ApiProperty({ example: 100, description: 'Cost of the path' })
  cost: number;
}
