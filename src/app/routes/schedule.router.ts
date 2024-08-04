import { Router } from "express";
import { IScheduleModule, scheduleRequestValidator } from "@modules/schedule";
import { scheduleController } from "@app/controllers/schedule.controller";

export function scheduleRouter(router: Router, { userService, service }: IScheduleModule) {
  const controller = scheduleController(service);
  const middlewareValidator = scheduleRequestValidator(userService);
  return [
    router.post("/", middlewareValidator, controller.create),
    router.put("/", middlewareValidator, controller.update),
    router.get("/search", middlewareValidator, controller.query),
    router.get("/list", controller.list),
    router.get("/:scheduleId", controller.getById),
    router.delete("/:scheduleId", controller.delete),
  ];
}

