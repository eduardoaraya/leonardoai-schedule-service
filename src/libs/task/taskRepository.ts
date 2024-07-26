import { PrismaClient } from "@prisma/client";
import { ITaskBase, ITaskQueryRequest, ITaskRepository} from "./taskContracts";

export function taskRepository(dbConnection: PrismaClient): ITaskRepository {
  return {
    async list(): Promise<ITaskBase[]> {
      return dbConnection.task.findMany({});
    },
    async query(request: ITaskQueryRequest) { return [] },
    async create(request: ITaskBase) { return {} as ITaskBase},
    async update(request: ITaskBase) { return {} as ITaskBase},
    async delete(taskId: number) { return; },
    async take(taskId: number) { return {} as ITaskBase}
  }
}
