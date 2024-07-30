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
    async list(): Promise<IScheduleBase[]>  {
      return repository.list();
    },
    async query(request: IScheduleQueryRequest) { 
      return repository.query(request);
    },
    async create(request: IScheduleCreateRequest) { 
      await repository.create(request);
      return true;
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
