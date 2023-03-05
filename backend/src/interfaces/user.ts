import { User as PrismaUser } from '@prisma/client';

export type User = PrismaUser;

export type UserCreate = Pick<User, 'public_address' | 'email'>;
export type UserUpdate = Partial<UserCreate>;
