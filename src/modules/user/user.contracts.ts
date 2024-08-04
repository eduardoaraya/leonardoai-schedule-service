import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export interface IUserRepository {
  list: () => Promise<IUserResult[]>;
  query: (request: IUserQueryRequest) => Promise<IUserResult[]>;
  create: (request: IUserCreateRequest) => Promise<IUser>;
  update: (request: IUserUpdateRequest, id: number) => Promise<IUser>;
  delete: (userId: number) => Promise<boolean>;
  getById: (userId: number, select?: IUserSelect) => Promise<IUser|null>;
}
export interface IUserService {
  list: () => Promise<IUserResult[]>;
  query: (request: IUserQueryRequest) => Promise<IUserResult[]>;
  create: (request: IUserCreateRequest) => Promise<boolean>;
  update: (request: IUserUpdateRequest, userId: number) => Promise<boolean>;
  delete: (userId: number) => Promise<boolean>;
  getById: (userId: number, select?: IUserSelect) => Promise<IUserResult|null>;
}
export interface IUserController {
  list: (req: Request, res: Response) => Promise<Response>;
  query: (req: Request<IUserQueryRequest>, res: Response) => Promise<Response>;
  create: (req: Request<IUserCreateRequest>, res: Response) => Promise<Response>;
  update: (req: Request<IUserUpdateRequest>, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
  getById: (req: Request, res: Response) => Promise<Response>;
}
export interface IUser extends UserBase {}
export interface IUserResult extends IUser { }
export interface IUserQueryRequest extends Prisma.UserWhereInput { }
export interface IUserCreateRequest extends Prisma.UserCreateInput { }
export interface IUserUpdateRequest extends Prisma.UserUpdateInput { }
export interface IUserSelect extends Prisma.UserSelectScalar { }

const userBase = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    email: true,
    name: true,
    id: true,
  }
});

export type UserBase = Prisma.UserGetPayload<typeof userBase>;

export type UserControllerFactory = (service: IUserService) => IUserController; 
export type UserControllerHandle = (factory: UserControllerFactory) => IUserController; 
