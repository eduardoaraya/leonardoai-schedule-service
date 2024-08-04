import { IUserService } from "@modules/user";
import { IScheduleService, IScheduleCreateRequest } from "@modules/schedule";

export function userScheduleCreate(
  body: IScheduleCreateRequest,
  userService: IUserService,
  scheduleService: IScheduleService
) {
  const startTime = new Date(body.startTime);
  const endTime = new Date(body.endTime);

  if (!service.validateStartandEndTimes(startTime, endTime))
    return res.status(StatusCodes.PRECONDITION_FAILED).send({ errors: "Invalid startTime!" });


  const account = await userService.getById(body.accountId);
  const agent = await userService.getById(body.agentId);

  if (!account || !agent || account.id === agent.id)
    return res.status(StatusCodes.PRECONDITION_FAILED)
  .send({ errors: "Invalid account or agent!" });

  const schedule = await service.create({
    startTime,
    endTime,
    accountId: account.id,
    agentId: agent.id,
  });

  return {};
}
