import { Router } from "express";
import { taskController } from "@app/controllers/task.controller";
import { TaskControllerHandle, taskRequestValidator } from "@modules/task";

export function taskRouter(router: Router, handle: TaskControllerHandle) {
  const controller = handle(taskController);
  return [
    router.post("/", taskRequestValidator, controller.create),
    router.put("/", taskRequestValidator, controller.update),
    router.get("/search", taskRequestValidator, controller.query),
    router.get("/list", controller.list),
    router.get("/:taskId", controller.take),
    router.delete("/:taskId", controller.delete),
  ];
}

