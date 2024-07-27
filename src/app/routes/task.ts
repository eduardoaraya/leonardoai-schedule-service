import { Router } from "express";
import { ITaskController } from "../../libs/task";

export function task(router: Router, controller: ITaskController) {
  return [
    router.post("/", controller.create),
    router.put("/", controller.update),
    router.get("/list", controller.list),
    router.get("/search", controller.query),
    router.get("/:taskId", controller.take),
    router.delete("/:taskId", controller.delete),
  ];
}

