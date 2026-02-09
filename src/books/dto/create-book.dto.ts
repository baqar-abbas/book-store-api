// src/books/dto/create-book.dto.ts
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsNumber()
  @Min(1000)
  @IsOptional()
  published?: number;
}
