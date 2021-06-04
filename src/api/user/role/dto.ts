export interface RoleDto {
  id: number;

  name: string;

  Code: string;

  isSendEmail: boolean;

  isCreateOrEditSheet: boolean;

  isCreateOrEditBook: boolean;

  isCreateOrEditUser: boolean;

  isCreateOrEditStudent: boolean;

  isCreatePost: boolean;
}
export interface RoleTitleDto {
  id: number;

  name: string;

  Code: string;
}
