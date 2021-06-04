import { DepartmentTitleDto } from "../department/dto";
import { RoleTitleDto, RoleDto } from "../role/dto";

export interface UserInputDto {
  id?: number;

  gender: boolean;

  name?: string;

  born?: Date;

  username?: string;

  email?: string;

  phoneNumber?: string;

  password?: string;

  roleId?: number;

  roleCode?: string;

  departmentId?: number;

  departmentCode?: number;

  avatar?: string;

  GenCode: string;

  isBlock: boolean;
}
export interface UserUpdateInputDto {
  id?: number;

  gender: boolean;

  name?: string;

  password?: string;

  phoneNumber?: string;

  born?: Date;

  avatar: string;

  GenCode: string;

  email?: string;
}
export interface UserTitleDto {
  id?: number;

  name?: string;

  born?: Date;

  role: RoleTitleDto;

  department: DepartmentTitleDto;

  avatar: string;

  GenCode: string;

  gender: boolean;

  email?: string;

  phoneNumber?: string;

  isBlock: boolean;
}
export interface UserInfoTitleDto {
  id?: number;

  name?: string;

  GenCode: string;

  gender: boolean;

  isBlock: boolean;

  avatar: string;
}
export interface UserNotificationDto {
  id?: number;

  name?: string;

  //   notificationSeen: NotificationGetList[];

  //   notificationSubscribe: NotificationGetList[];
}
export interface UserPostTitleDto {
  id?: number;

  name?: string;

  department: DepartmentTitleDto;

  avatar: string;

  GenCode: string;

  gender: boolean;

  email?: string;

  phoneNumber?: string;
}
export interface UserAccountDto {
  id?: number;

  name?: string;

  born?: Date;

  role: RoleDto;

  department: DepartmentTitleDto;

  avatar: string;

  GenCode: string;

  gender: boolean;

  email?: string;

  phoneNumber?: string;
}
export interface AccountChangePassword {
  userId: number;

  password: string;

  newPassword: string;
}
export interface UserInputSheetDto {
  gender: boolean;

  name?: string;

  born?: Date;

  username?: string;

  email?: string;

  phoneNumber?: string;

  password?: string;

  roleCode?: string;

  departmentCode?: string;

  avatar?: string;

  GenCode: string;
}
