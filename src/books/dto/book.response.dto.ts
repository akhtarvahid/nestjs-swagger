import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty({ example: 111 })
  id: number;

  @ApiProperty({ example: 'The Mountain' })
  title: string;

  @ApiProperty({ example: 'Buelder' })
  author: string;

  @ApiProperty({ example: 2020, required: false })
  year?: number;

  @ApiProperty({ example: '2025-05-16T15:44:40.317Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-16T17:54:40.317Z' })
  updatedAt: Date;
}
