import { PrismaClient } from "@prisma/client";
import { taskController } from "./task.controller";
import { taskRepository } from "./task.repository";
import { taskService } from "./task.service";

export function taskHandleFactory(connection: PrismaClient) {
  return taskController(taskService(taskRepository(connection)));
}
