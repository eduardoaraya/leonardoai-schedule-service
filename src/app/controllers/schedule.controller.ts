import { Request, Response } from "express";
import { 
  IScheduleService,
  IScheduleController,
  IScheduleQueryRequest,
  IScheduleUpdateRequest,
  IScheduleCreateRequest,
  IScheduleBase
} from "../../libs/schedule/schedule.contracts"
import debug from "debug";

const log = debug("schedule");

export function scheduleController(service: IScheduleService): IScheduleController {
  return {
    async list(_req: Request, res: Response): Promise<Response> {
      try {
        const result = await service.list();
        return res.status(200).send(result); 
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
    async query(req: Request<IScheduleQueryRequest>, res: Response): Promise<Response> {
      try {
        const result = await service.query(req.body);
        return res.status(200).send(result); 
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
    async create(req: Request<IScheduleCreateRequest>, res: Response): Promise<Response> {
      try {
        await service.create(req.body);
        return res.sendStatus(201); 
      } catch (error) {
        log(error);
        return res.status(500).send({ error });
      }
    },
    async update(req: Request<IScheduleUpdateRequest>, res: Response): Promise<Response> {
      try {
        await service.update(req.body, req.body?.id);
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(500);
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
        return res.sendStatus(500);
      }
    },
    async take(req: Request, res: Response<IScheduleBase>): Promise<Response> {
      try {
        const scheduleId: string = String(req?.params.scheduleId);
        if (!scheduleId)
          throw new Error("Invalid paramter!");
        
        const schedule = await service.take(scheduleId);
        if (!schedule) return res.sendStatus(404);

        return res.status(200).send(schedule);
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
  }
}

