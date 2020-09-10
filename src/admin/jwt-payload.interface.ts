import { AdminRole } from './admin-role.enum'

export interface JwtPayload{
  id: string;
  username: string;
  role: AdminRole;
}
