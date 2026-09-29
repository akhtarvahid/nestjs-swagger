import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'The Hobbit',
    description: 'Book title',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'J.R.R. Tolkien',
    description: 'Author name',
    required: true,
  })
  @IsString()
  author: string;

  @ApiProperty({
    example: 1933,
    description: 'Publication year',
    required: false,
  })
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  year?: number;
}
