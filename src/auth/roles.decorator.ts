import { SetMetadata } from '@nestjs/common';
import { Role } from '../User/User.schema';
import * as dotenv from 'dotenv';
dotenv.config();

export const ROLES_KEY = process.env.Roles_key;
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
