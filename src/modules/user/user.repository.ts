import { PrismaClient } from "@prisma/client";
import { 
  IUser,
  IUserQueryRequest,
  IUserRepository,
  IUserCreateRequest,
  IUserUpdateRequest,
  IUserSelect
} from "./user.contracts";

export function userRepository(dbConnection: PrismaClient): IUserRepository {
  return {
    async list(): Promise<IUser[]> {
      return dbConnection.user.findMany();
    },
    async query(where: IUserQueryRequest): Promise<IUser[]> { 
      return dbConnection.user.findMany({ where });
    },
    async create(data: IUserCreateRequest): Promise<IUser> {
      return dbConnection.user.create({ data });
    },
    async update(data: IUserUpdateRequest, id: number): Promise<IUser> { 
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
    async getById(id: number, select?: IUserSelect): Promise<IUser|null> {
      if (!id) throw new Error("Id parameter is missing!");

      return dbConnection.user.findUnique({
        where: { id },
        select
      });
    }
  }
}
