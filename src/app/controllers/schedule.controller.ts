import { Request, Response } from "express";
import { 
  IScheduleService,
  IScheduleController,
  IScheduleQueryRequest,
  IScheduleUpdateRequest,
  IScheduleCreateRequest,
  IScheduleBase
} from "@modules/schedule";
import { 
  IUserService
} from "@modules/user";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export function scheduleController(service: IScheduleService, userService: IUserService): IScheduleController {
  return {
    async list(_req: Request, res: Response): Promise<Response> {
      try {
        const result = await service.list();
        return res.status(StatusCodes.OK).send(result); 
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR); 
      }
    },
    async query(req: Request<IScheduleQueryRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(StatusCodes.PRECONDITION_FAILED).send({ errors: validation.array() });

        const result = await service.query(req.body);
        return res.status(StatusCodes.OK).send(result); 
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR); 
      }
    },
    async create(req: Request<IScheduleCreateRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);

        if (!validation.isEmpty())
          return res.status(StatusCodes.PRECONDITION_FAILED).send({ errors: validation.array() });

        const { body } = req;
        const startTime = new Date(body.startTime);
        const endTime = new Date(body.endTime);

        if (!service.validateStartandEndTimes(startTime, endTime))
          return res.status(StatusCodes.PRECONDITION_FAILED).send({ errors: "Invalid startTime!" });

  
        const account = await userService.take(body.accountId);
        const agent = await userService.take(body.agentId);

        if (!account || !agent || account.id === agent.id)
          return res.status(StatusCodes.PRECONDITION_FAILED).send({ errors: "Invalid account or agent!" });

        const schedule = await service.create({
          startTime,
          endTime,
          accountId: account.id,
          agentId: agent.id,
        });

        return res.status(201).send(schedule);
      } catch (error: unknown) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ 
          error: error instanceof Error ? error?.message : "Internal server error!"
        });
      }
    },
    async update(req: Request<IScheduleUpdateRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(StatusCodes.PRECONDITION_FAILED).send({ errors: validation.array() });

        await service.update(req.body, req.body?.id);
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    },
    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const scheduleId: string = String(req?.params.scheduleId);
        if (!scheduleId)
          throw new Error("Invalid paramter!");
        
        const schedule = await service.take(scheduleId);
        if (!schedule) return res.sendStatus(404);

        await service.delete(scheduleId)
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    },
    async take(req: Request, res: Response<IScheduleBase>): Promise<Response> {
      try {
        const scheduleId: string = String(req?.params.scheduleId);
        if (!scheduleId)
          throw new Error("Invalid paramter!");
        
        const schedule = await service.take(scheduleId);
        if (!schedule) return res.sendStatus(404);

        return res.status(StatusCodes.OK).send(schedule);
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR); 
      }
    },
  }
}

