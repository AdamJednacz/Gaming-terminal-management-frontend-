import type { UserRole } from '../enums/userRoles';

export interface UserModel {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
