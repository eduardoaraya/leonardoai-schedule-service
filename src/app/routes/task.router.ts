import { Router } from "express";
import { taskController } from "../controllers/task.controller";
import { TaskControllerHandle } from "../../libs/task";

export function taskRouter(router: Router, handle: TaskControllerHandle) {
  const controller = handle(taskController);
  return [
    router.post("/", controller.create),
    router.put("/", controller.update),
    router.get("/list", controller.list),
    router.get("/search", controller.query),
    router.get("/:taskId", controller.take),
    router.delete("/:taskId", controller.delete),
  ];
}

