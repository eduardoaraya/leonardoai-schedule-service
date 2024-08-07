import { IUserBase } from "@modules/user";
import { IScheduleBase } from "@modules/schedule";
import { 
  ITaskRepository,
  ITaskCreateRequest,
  ITaskUpdateRequest,
  ITaskQueryRequest,
  ITaskService
} from "./task.contracts";

export function taskService(repository: ITaskRepository): ITaskService {
  return {
    async filter(request: ITaskQueryRequest) { 
      return repository.query(request);
    },
    async create(account: IUserBase, schedule: IScheduleBase, data: ITaskCreateRequest) { 
      return repository.create({
        accountId: account.id,
        scheduleId: schedule.id,
        startTime: data.startTime,
        duration: Number(data.duration),
        type: data.type
      });
    },
    async update(request: ITaskUpdateRequest, taskId: string) { 
      return repository.update(taskId, request);
    },
    async delete(taskId: string) {
      return repository.delete(taskId);
    },
    async getById(taskId: string) {
      return repository.getById(taskId);
    }
  }
};
