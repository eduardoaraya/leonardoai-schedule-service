import { PrismaClient } from "@prisma/client";
import { 
  ITaskBase,
  ITaskQueryRequest,
  ITaskRepository,
  ITaskCreateRequest,
  ITaskUpdateRequest
} from "./task.contracts";

export function taskRepository(dbConnection: PrismaClient): ITaskRepository {
  return {
    async list(): Promise<ITaskBase[]> {
      return dbConnection.task.findMany();
    },
    async query(where: ITaskQueryRequest): Promise<ITaskBase[]> { 
      return dbConnection.task.findMany({ where });
    },
    async create(data: ITaskCreateRequest): Promise<ITaskBase> {
      return dbConnection.task.create({ data });
    },
    async update(data: ITaskUpdateRequest, id: string): Promise<ITaskBase> { 
      return dbConnection.task.update({ 
        data, 
        where: { id }
      });
    },
    async delete(id: string): Promise<boolean> {
      await dbConnection.task.delete({
        where: { id }
      });
      return true;
    },
    async getById(id: string): Promise<ITaskBase|null> {
      return dbConnection.task.findUnique({
        where: { id }
      });
    }
  }
}
