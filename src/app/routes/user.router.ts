import { Router } from "express";
import { IUserController } from "../../libs/user";

export function userRouter(router: Router, controller: IUserController) {
  return [
    router.post("", controller.create),
    router.put("", controller.update),
    router.get("/list", controller.list),
    router.get("/search", controller.query),
    router.get("/:userId", controller.take),
    router.delete("/:userId", controller.delete),
  ];
}

