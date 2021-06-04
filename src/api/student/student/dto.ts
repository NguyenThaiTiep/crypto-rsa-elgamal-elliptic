import { FacutlyDto } from "../facutly/dto";

export interface StudentInputDto {
  id: number;

  idStudent: string;

  name: string;

  born: Date;

  grade: string;

  note: string;

  facultyId: number;
}
export interface StudentTitleDto {
  id: number;

  idStudent: string;

  name: string;
}
export interface StudentGetDto {
  id: number;

  idStudent: string;

  name: string;

  born: Date;

  grade: string;

  note: string;

  faculty: FacutlyDto;
}
export interface StudentSearchBookDto {
  id: number;

  idStudent: string;

  name: string;

  born: Date;

  grade: string;

  note: string;

  faculty: FacutlyDto;
}
