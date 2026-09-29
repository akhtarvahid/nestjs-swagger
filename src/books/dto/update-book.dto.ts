import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

// PartialType make inherited fields optional and * is not available
// export class UpdateBookDto extends PartialType(CreateBookDto) {}

// title and author are mandatory now without *
// export class UpdateBookDto extends PartialType(
//   PickType(CreateBookDto, ['title', 'author'] as const),
// ) {}

// PartialType with mandatory field
export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ required: true }) // Forces Swagger to mark as required
  id: number;

  @ApiProperty({ required: true }) // Forces Swagger to mark as required
  title: string;
}
