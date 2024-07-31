import { PrismaClient } from "@prisma/client";
import { scheduleRepository } from "./schedule.repository";
import { scheduleService } from "./schedule.service";
import { userService, userRepository } from "../user";
import { ScheduleControllerFactory, ScheduleControllerHandle } from "./schedule.contracts";

export function scheduleHandleFactory(connection: PrismaClient): ScheduleControllerHandle {
  return (factory: ScheduleControllerFactory) => factory(
    scheduleService(scheduleRepository(connection)),
    userService(userRepository(connection)),
  );
}
