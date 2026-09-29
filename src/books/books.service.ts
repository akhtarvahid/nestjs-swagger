// src/books/books.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookResponseDto } from './dto/book.response.dto';

@Injectable()
export class BooksService {
  private books: BookResponseDto[] = [];

  create(createBookDto: CreateBookDto) {
    try {
      // Validate input
      if (!createBookDto.title || !createBookDto.author) {
        throw new BadRequestException('Title and author are required');
      }

      // Check for duplicate book
      const duplicate = this.books.find(
        (book) =>
          book.title.toLowerCase() === createBookDto.title.toLowerCase(),
      );
      if (duplicate) {
        throw new ConflictException(
          `Book with title "${createBookDto.title}" already exists`,
        );
      }

      // Create new book
      const newBook = {
        id: Date.now(),
        ...createBookDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.books.push(newBook);
      return newBook;
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create book');
    }
  }

  findAll() {
    try {
      // return this.books.length ? this.books : [Defaultbook];
      return this.books;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch books');
    }
  }

  findOne(id: number) {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('Invalid book ID');
      }

      const book = this.books.find((book) => book.id === id);
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return book;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch book');
    }
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('Invalid book ID');
      }
      console.log('BOOks', this.books);

      const index = this.books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      // Check for title conflict if title is being updated
      if (updateBookDto.title) {
        const duplicate = this.books.find(
          (book, i) =>
            i !== index &&
            book.title.toLowerCase() === updateBookDto?.title?.toLowerCase(),
        );
        if (duplicate) {
          throw new ConflictException(
            `Another book with title "${updateBookDto.title}" already exists`,
          );
        }
      }

      const updatedBook = {
        ...this.books[index],
        ...updateBookDto,
        updatedAt: new Date(),
      };

      this.books[index] = updatedBook;
      return updatedBook;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update book');
    }
  }

  remove(id: number) {
    try {
      if (isNaN(id)) {
        throw new BadRequestException('Invalid book ID');
      }

      const index = this.books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      const [deletedBook] = this.books.splice(index, 1);
      return deletedBook;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete book');
    }
  }
}
