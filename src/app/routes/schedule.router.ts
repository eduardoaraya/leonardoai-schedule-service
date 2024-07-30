import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { UserControllerHandle } from "../../libs/user/user.contracts";

export function userRouter(router: Router, handle: UserControllerHandle) {
  const controller = handle(userController);
  return [
    router.post("/", controller.create),
    router.put("/", controller.update),
    router.get("/list", controller.list),
    router.get("/search", controller.query),
    router.get("/:userId", controller.take),
    router.delete("/:userId", controller.delete),
  ];
}

