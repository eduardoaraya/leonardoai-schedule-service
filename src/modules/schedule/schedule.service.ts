import { 
  IScheduleRepository,
  IScheduleBase,
  IScheduleCreateRequest,
  IScheduleUpdateRequest,
  IScheduleQueryRequest,
  IScheduleService,
} from "./schedule.contracts";
import { IUser } from "@modules/user";

export function scheduleService(repository: IScheduleRepository): IScheduleService {
  return {
    async hasConflictingAppointments(user: IUser, startTime: Date | string, endTime: Date | string): Promise<boolean> {
      const betweenDates = {
        lte: new Date(endTime),
        gte: new Date(startTime),
      };
      const result = await repository.query({
        OR: [
          {
            accountId: user.id,
            startTime: betweenDates,
          },
          {
            accountId: user.id,
            endTime: betweenDates
          }
        ]
      });

      return result.length > 0;
    },
    async list(): Promise<IScheduleBase[]>  {
      return repository.list();
    },
    async query(request: IScheduleQueryRequest) { 
      return repository.query(request);
    },
    async create(account: IUser, agent: IUser, request: Pick<IScheduleCreateRequest, "startTime" | "endTime">) { 
      return await repository.create({
        accountId: account.id,
        agentId: agent.id,
        startTime: request.startTime,
        endTime: request.endTime
      });
    },
    async update(request: IScheduleUpdateRequest, scheduleId: string) { 
      await repository.update(request, scheduleId);
      return true;
    },
    async delete(scheduleId: string) {
      return repository.delete(scheduleId);
    },
    async getById(scheduleId: string) {
      return repository.getById(scheduleId);
    }
  }
};
