import { PrismaClient } from "@prisma/client";
import { taskRepository } from "./task.repository";
import { taskService } from "./task.service";
import { TaskControllerHandle, TaskControllerFactory } from "./task.contracts";

export function taskHandleFactory(connection: PrismaClient): TaskControllerHandle {
  return (factory: TaskControllerFactory) => factory(taskService(taskRepository(connection)));
}
