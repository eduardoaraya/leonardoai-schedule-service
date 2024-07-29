import { PrismaClient } from "@prisma/client";
import { userController } from "./user.controller";
import { userRepository } from "./user.repository";
import { userService } from "./user.service";

export function userHandleFactory(connection: PrismaClient) {
  return userController(userService(userRepository(connection)));
}
