import { Router } from "express";
import { scheduleController } from "../controllers/schedule.controller";
import { ScheduleControllerHandle } from "../../libs/schedule/schedule.contracts";

export function scheduleRouter(router: Router, handle: ScheduleControllerHandle) {
  const controller = handle(scheduleController);
  return [
    router.post("/", controller.create),
    router.put("/", controller.update),
    router.get("/list", controller.list),
    router.get("/search", controller.query),
    router.get("/:scheduleId", controller.take),
    router.delete("/:scheduleId", controller.delete),
  ];
}

