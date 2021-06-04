import { StudentTitleDto } from "../../student/student/dto";
import { UserInfoTitleDto } from "../../user/user/dto";
import { BookDetailGetDto } from "../bookDetail/dto";

export interface BookOrderCreateDto {
  id: number;

  borrowDate: Date;

  idBookdetail: string;

  idStudent: string;

  deadline: Date;

  userCheckInId: number;
}
export interface BookOrderGetDto {
  id: number;

  borrowDate: Date;

  payDate: Date;

  deadline: Date;

  
  bookdetail: BookDetailGetDto;
}
export interface BookOrderInfoDto {
  id: number;

  borrowDate: Date;

  payDate: Date;

  deadline: Date;

 
  bookdetail: BookDetailGetDto;

 
  userCheckIn: UserInfoTitleDto;


  userCheckOut: UserInfoTitleDto;
}
export interface BookOrderPayDto {
  idBookDetail: string;

  id: number;

  studentId: string;

  payDate: Date;

  userCheckOutId: number;
}
export interface BookOrderList {
  id: number;

 
  bookdetail: BookDetailGetDto;

  
  student: StudentTitleDto;

  type: boolean;

  update_at: Date;

  payDate: Date;

  borrowDate: Date;
}
