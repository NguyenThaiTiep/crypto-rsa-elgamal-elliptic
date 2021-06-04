import { BookTitleDto } from "../book/dto";

export interface BookDetailInputDto {
  id: number;

  idBookDetails: string; //masach

  idBook: string; //masach
}
export interface BookDetailGetDto {
  id: number;

  idBookDetails: string; //masach

  book: BookTitleDto;
}
