import { PrismaClient } from "@prisma/client";
import { 
  IScheduleBase,
  IScheduleQueryRequest,
  IScheduleRepository,
  IScheduleCreateRequest,
  IScheduleUpdateRequest
} from "./schedule.contracts";

export function scheduleRepository(dbConnection: PrismaClient): IScheduleRepository {
  return {
    async list(): Promise<IScheduleBase[]> {
      return dbConnection.schedule.findMany();
    },
    async query(where: IScheduleQueryRequest): Promise<IScheduleBase[]> { 
      return dbConnection.schedule.findMany({ where });
    },
    async create(data: IScheduleCreateRequest): Promise<IScheduleBase> {
      return dbConnection.schedule.create({ data });
    },
    async update(data: IScheduleUpdateRequest, id: string): Promise<IScheduleBase> { 
      return dbConnection.schedule.update({ 
        data, 
        where: { id }
      });
    },
    async delete(id: string): Promise<boolean> {
      await dbConnection.schedule.delete({
        where: { id }
      });
      return true;
    },
    async take(id: string): Promise<IScheduleBase|null> {
      return dbConnection.schedule.findUnique({
        where: { id }
      });
    }
  }
}
