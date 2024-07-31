import { 
  IScheduleRepository,
  IScheduleBase,
  IScheduleCreateRequest,
  IScheduleUpdateRequest,
  IScheduleQueryRequest,
  IScheduleService
} from "./schedule.contracts";

export function scheduleService(repository: IScheduleRepository): IScheduleService {
  return {
    validateStartandEndTimes(startTime: Date, endTime: Date): boolean {
      return startTime.getTime() >= endTime.getTime();
    },
    async list(): Promise<IScheduleBase[]>  {
      return repository.list();
    },
    async query(request: IScheduleQueryRequest) { 
      return repository.query(request);
    },
    async create(request: IScheduleCreateRequest) { 
      return await repository.create({
        accountId: request.accountId,
        agentId: request.agentId,
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
    async take(scheduleId: string) {
      return repository.take(scheduleId);
    }
  }
};
