import { Request, Response } from "express";
import { 
  IScheduleService,
  IScheduleController,
  IScheduleQueryRequest,
  IScheduleUpdateRequest,
  IScheduleCreateRequest,
  IScheduleBase
} from "@modules/schedule";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export function scheduleController(service: IScheduleService): IScheduleController {
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
          return res.status(StatusCodes.PRECONDITION_FAILED)
                    .send({ errors: validation.array() });

        const { startTime, endTime, account, agent } = req.body;
        const hasConflicting = await Promise.all([
          service.hasConflictingAppointments(agent, startTime, endTime),
          service.hasConflictingAppointments(account, startTime, endTime)
        ]);

        if (hasConflicting.includes(true)) 
          return res.status(StatusCodes.NOT_ACCEPTABLE)
                    .send({ errors: { msg: "There's conflicting appointments!"} });

        const schedule = await service.create(
          account,
          agent,
          {
            startTime,
            endTime,
          }
        );

        return res.status(StatusCodes.CREATED).send(schedule);
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
        return res.sendStatus(StatusCodes.OK); 
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    },
    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const scheduleId: string = String(req?.params.scheduleId);
        if (!scheduleId)
          throw new Error("Invalid paramter!");
        
        const schedule = await service.getById(scheduleId);
        if (!schedule) return res.sendStatus(StatusCodes.NOT_FOUND);

        await service.delete(scheduleId)
        return res.sendStatus(StatusCodes.OK); 
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    },
    async getById(req: Request, res: Response<IScheduleBase>): Promise<Response> {
      try {
        const scheduleId: string = String(req?.params.scheduleId);
        if (!scheduleId)
          throw new Error("Invalid paramter!");
        
        const schedule = await service.getById(scheduleId);
        if (!schedule) return res.sendStatus(StatusCodes.NOT_FOUND);

        return res.status(StatusCodes.OK).send(schedule);
      } catch (error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR); 
      }
    },
  }
}

