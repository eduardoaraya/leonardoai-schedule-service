import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export interface IUserRepository {
  list: () => Promise<IUserBase[]>;
  query: (request: IUserQueryRequest) => Promise<IUserResult[]>;
  create: (request: IUserCreateRequest) => Promise<IUserBase>;
  update: (request: IUserUpdateRequest, id: number) => Promise<IUserBase>;
  delete: (userId: number) => Promise<boolean>;
  take: (userId: number) => Promise<IUserBase|null>;
}
export interface IUserService {
  list: () => Promise<IUserResult[]>;
  query: (request: IUserQueryRequest) => Promise<IUserResult[]>;
  create: (request: IUserCreateRequest) => Promise<boolean>;
  update: (request: IUserUpdateRequest, userId: number) => Promise<boolean>;
  delete: (userId: number) => Promise<boolean>;
  take: (userId: number) => Promise<IUserResult|null>;
}
export interface IUserController {
  list: (req: Request, res: Response) => Promise<Response>;
  query: (req: Request<IUserQueryRequest>, res: Response) => Promise<Response>;
  create: (req: Request<IUserCreateRequest>, res: Response) => Promise<Response>;
  update: (req: Request<IUserUpdateRequest>, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
  take: (req: Request, res: Response) => Promise<Response>;
}
export interface IUserBase extends UserBase {}
export interface IUserResult extends IUserBase { }
export interface IUserQueryRequest extends Prisma.UserWhereInput { }
export interface IUserCreateRequest extends Prisma.UserCreateInput { }
export interface IUserUpdateRequest extends Prisma.UserUpdateInput { }

const userBase = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    email: true,
    name: true,
  }
});

type UserBase = Prisma.UserGetPayload<typeof userBase>;
