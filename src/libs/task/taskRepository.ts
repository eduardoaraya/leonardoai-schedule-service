import { dbConnection } from "../infra/db-connection";
import { ITaskBase } from "./taskContracts";

export function taskRepository() {
  return {
    async list(): Promise<ITaskBase[]> {
      return dbConnection.task.findMany({});
    }
  }
}
