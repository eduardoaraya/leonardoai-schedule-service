import { PrismaClient } from "@prisma/client";
import { userRepository } from "./user.repository";
import { userService } from "./user.service";
import { UserControllerFactory, UserControllerHandle } from "./user.contracts";

export function userHandleFactory(connection: PrismaClient): UserControllerHandle {
  return (factory: UserControllerFactory) => factory(userService(userRepository(connection)));
}
