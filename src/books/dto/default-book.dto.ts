// src/books/dto/default-book.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class DefaultBookDto {
  @ApiProperty({ example: 34343 })
  id: number;

  @ApiProperty({ example: 'Default entry' })
  title: string;

  @ApiProperty({ example: 'Robert' })
  author: string;

  @ApiProperty({ example: 2005 })
  year: number;
}