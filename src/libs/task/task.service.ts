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
    async query(request: ITaskQueryRequest) { return [] },
    async create(request: ITaskCreateRequest) { return true },
    async update(request: ITaskUpdateRequest) { return true },
    async delete(taskId: number) { return true },
    async take(taskId: number) { return {} as ITaskBase }
  }
};
