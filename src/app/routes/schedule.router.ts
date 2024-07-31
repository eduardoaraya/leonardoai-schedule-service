import { Router } from "express";
import { ScheduleControllerHandle, scheduleRequestValidator } from "@modules/schedule";
import { scheduleController } from "@app/controllers/schedule.controller";

export function scheduleRouter(router: Router, handle: ScheduleControllerHandle) {
  const controller = handle(scheduleController);
  return [
    router.post("/", scheduleRequestValidator, controller.create),
    router.put("/", scheduleRequestValidator, controller.update),
    router.get("/search", scheduleRequestValidator, controller.query),
    router.get("/list", controller.list),
    router.get("/:scheduleId", controller.take),
    router.delete("/:scheduleId", controller.delete),
  ];
}

