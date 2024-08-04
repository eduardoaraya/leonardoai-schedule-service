import { PrismaClient } from "@prisma/client";
import { scheduleRepository } from "./schedule.repository";
import { scheduleService } from "./schedule.service";
import { IScheduleModule } from "./schedule.contracts";
import { userService, userRepository } from "@modules/user";

export function scheduleModule(connection: PrismaClient): IScheduleModule {
  const repository = scheduleRepository(connection);
  const service = scheduleService(repository);

  return {
    service,
    repository,
    userService: userService(userRepository(connection))
  } 
}
