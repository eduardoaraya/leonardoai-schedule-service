import { PrismaClient } from "@prisma/client";
import { 
  IUserBase,
  IUserQueryRequest,
  IUserRepository,
  IUserCreateRequest,
  IUserUpdateRequest
} from "./user.contracts";

export function userRepository(dbConnection: PrismaClient): IUserRepository {
  return {
    async list(): Promise<IUserBase[]> {
      return dbConnection.user.findMany();
    },
    async query(where: IUserQueryRequest): Promise<IUserBase[]> { 
      return dbConnection.user.findMany({ where });
    },
    async create(data: IUserCreateRequest): Promise<IUserBase> {
      return dbConnection.user.create({ data });
    },
    async update(data: IUserUpdateRequest, id: number): Promise<IUserBase> { 
      return dbConnection.user.update({ 
        data, 
        where: { id }
      });
    },
    async delete(id: number): Promise<boolean> {
      await dbConnection.user.delete({
        where: { id }
      });
      return true;
    },
    async take(id: number): Promise<IUserBase|null> {
      return dbConnection.user.findUnique({
        where: { id }
      });
    }
  }
}
