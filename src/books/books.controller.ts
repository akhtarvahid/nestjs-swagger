import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookResponseDto } from './dto/book.response.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiOkResponse({
    description: 'Book created successfully',
    type: BookResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({ description: 'Book with this title already exists' })
  @ApiInternalServerErrorResponse({ description: 'Failed to create book' })
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book by id!' })
  @ApiParam({ name: 'id', type: Number, example: 0 })
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({
    description: 'Book updated successfully',
    type: BookResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @ApiForbiddenResponse({ description: 'Forbidden!' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of all books' })
  @ApiOkResponse({ type: [BookResponseDto], description: 'List of all books' })
  findAllBooks() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id!' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'A book found', type: BookResponseDto })
  @ApiNotFoundResponse({ description: "Book with specified ID doesn't exist" })
  @ApiBadRequestResponse({ description: 'Invalid book ID' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by id!' })
  @ApiParam({ name: 'id', type: Number, example: 2 })
  @ApiOkResponse({ description: 'Book deleted', type: BookResponseDto })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @ApiBadRequestResponse({ description: 'Invalid book ID' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
