import { 
  ITaskRepository,
  ITaskBase,
  ITaskCreateRequest,
  ITaskUpdateRequest,
  ITaskQueryRequest,
  ITaskService
} from "./task.contracts";

export function taskService(repository: ITaskRepository): ITaskService {
  return {
    async list(): Promise<ITaskBase[]>  {
      return repository.list();
    },
    async query(request: ITaskQueryRequest) { 
      return repository.query(request);
    },
    async create(request: ITaskCreateRequest) { 
      await repository.create(request);
      return true;
    },
    async update(request: ITaskUpdateRequest, taskId: string) { 
      await repository.update(request, taskId);
      return true;
    },
    async delete(taskId: string) {
      return repository.delete(taskId);
    },
    async take(taskId: string) {
      return repository.take(taskId);
    }
  }
};
