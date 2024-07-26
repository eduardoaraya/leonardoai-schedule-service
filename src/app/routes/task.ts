import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import * as Task from "../../libs/task";

export function task(router: Router, connection: PrismaClient) {
  const repository = Task.taskRepository(connection);
  const service = Task.taskService(repository);
  const controller = Task.taskController(service);
  
  router.post("/", controller.create)
  router.put("/", controller.update)
  router.get("/list", controller.list)
  router.get("/search", controller.query)
  router.get("/:taskId", controller.take)
  router.delete("/:taskId", controller.delete)
  return router;
}

