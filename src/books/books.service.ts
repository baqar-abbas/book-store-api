// src/books/books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // Create a new book
  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  // Get all books
  async findAll() {
    return this.prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get one book by ID
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  // Update a book
  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id); // Check if book exists

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  // Delete a book
  async remove(id: number) {
    await this.findOne(id); // Check if book exists

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
