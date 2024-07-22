import { ITaskRepository, ITaskBase } from "./taskContracts";

export function taskService(repository: ITaskRepository) {
  return {
   async list(): Promise<ITaskBase[]>  {
      return repository.list();
    }
  }
};
