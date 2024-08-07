import { PrismaClient } from "@prisma/client";
import { 
  ITaskBase,
  ITaskQueryRequest,
  ITaskRepository,
  ITaskCreate,
  ITaskUpdateRequest,
  ITaskSelect
} from "./task.contracts";

export function taskRepository(dbConnection: PrismaClient): ITaskRepository {
  return {
    async query(where: ITaskQueryRequest, select?: ITaskSelect): Promise<ITaskBase[]> { 
      return dbConnection.task.findMany({ where, select });
    },
    async create(data: ITaskCreate, select?: ITaskSelect): Promise<ITaskBase> {
      return dbConnection.task.create({ data, select });
    },
    async update(id: string, data: ITaskUpdateRequest, select?: ITaskSelect): Promise<ITaskBase> { 
      if (!id) throw new Error("Id parameter is missing!");
      return dbConnection.task.update({ 
        data, 
        where: { id },
        select
      });
    },
    async delete(id: string): Promise<boolean> {
      if (!id) throw new Error("Id parameter is missing!");
      await dbConnection.task.delete({
        where: { id }
      });
      return true;
    },
    async getById(id: string, select?: ITaskSelect): Promise<ITaskBase|null> {
      if (!id) throw new Error("Id parameter is missing!");
      return dbConnection.task.findUnique({
        where: { id },
        select
      });
    }
  }
}
