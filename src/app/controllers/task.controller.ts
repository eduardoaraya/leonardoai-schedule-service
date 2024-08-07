import { Request, Response } from "express";
import { 
  ITaskController,
  ITaskUpdateRequest,
  ITaskCreateRequest,
  ITaskModule,
  ITaskBase
} from "@modules/task";
import { validationResult } from "express-validator";
import { responseError } from  "@infra/http-utils";

export function taskController({ service, userService }: ITaskModule): ITaskController {
  return {
    async filter(req: Request, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(412).send({ errors: validation.array() });

        const result = await service.filter(req.body);
        return res.status(200).send(result); 
      } catch (error) {
        return responseError(res, error);
      }
    },
    async create(req: Request<{}, {}, ITaskCreateRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(412).send({ errors: validation.array() });

        const { schedule, startTime, duration, type } = req.body;
        if (!schedule)
          return res.status(412).send({ error: "Invalid Schedule!" });

        const account = await userService.getById(schedule.accountId);
        if (!account) 
          return res.status(412).send({ error: "Invalid Account!" });

        const task = await service.create(account, schedule, { 
          startTime,
          duration,
          type,
        });

        return res.status(201).send({ task });
      } catch (error) {
        return responseError(res, error);
      }
    },
    async update(req: Request<ITaskUpdateRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(412).send({ errors: validation.array() });

        await service.update(req.body, req.body?.id);
        return res.sendStatus(201); 
      } catch (error) {
        return responseError(res, error);
      }
    },
    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const taskId: string = String(req?.params.taskId);
        if (!taskId)
          throw new Error("Invalid paramter!");
 
        const result = await service.getById(taskId);
        if (!result) return res.sendStatus(404);

        await service.delete(taskId)
        return res.sendStatus(201); 
      } catch (error) {
        return responseError(res, error);
      }
    },
    async getById(req: Request, res: Response<ITaskBase>): Promise<Response> {
      try {
        const taskId: string = String(req?.params.taskId);
        const result = await service.getById(taskId);
        if (!result) return res.sendStatus(404);

        return res.status(200).send(result)
      } catch (error) {
        return responseError(res, error);
      }
    },
  }
}

