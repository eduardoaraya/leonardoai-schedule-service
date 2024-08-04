import { Router } from "express";
import { userController } from "@app/controllers/user.controller";
import { UserControllerHandle, userRequestValidator } from "@modules/user";

export function userRouter(router: Router, handle: UserControllerHandle) {
  const controller = handle(userController);
  return [
    router.post("/", userRequestValidator, controller.create),
    router.put("/", userRequestValidator, controller.update),
    router.get("/search", userRequestValidator, controller.query),
    router.get("/list", controller.list),
    router.get("/:userId", controller.getById),
    router.delete("/:userId", controller.delete),
  ];
}

