import { Request, Response } from "express";
import { 
  ITaskService,
  ITaskController,
  ITaskQueryRequest,
  ITaskUpdateRequest,
  ITaskCreateRequest,
  ITaskBase
} from "./task.contracts"

export function taskController(service: ITaskService): ITaskController {
  return {
    async list(_req: Request, res: Response): Promise<void> {
      try {
        const result = await service.list();
        res.status(200).send(result); 
      } catch (error) {
        res.sendStatus(500); 
      }
    },
    async query(req: Request<ITaskQueryRequest>, res: Response): Promise<void> {
      try {
        const result = await service.query(req.body);
        res.status(200).send(result); 
      } catch (error) {
        res.sendStatus(500); 
      }
    },
    async create(req: Request<ITaskCreateRequest>, res: Response): Promise<void> {
      try {
        await service.create(req.body);
        res.sendStatus(201); 
      } catch (error) {
        res.sendStatus(500);
      }
    },
    async update(req: Request<ITaskUpdateRequest>, res: Response): Promise<void> {
      try {
        await service.update(req.body);

        res.sendStatus(201); 
      } catch (error) {
        res.sendStatus(500);
      }
    },
    async delete(req: Request, res: Response): Promise<void> {
      try {
        const taskId: number = Number(req?.params.taskId);
        if (taskId < 0 || taskId >= Number.MAX_SAFE_INTEGER) {
          throw new Error("Invalid paramter!");
        }

        await service.delete(taskId)
        res.sendStatus(201); 
      } catch (error) {
        res.sendStatus(500);
      }
    },
    async take(req: Request, res: Response<ITaskBase>): Promise<void> {
      try {
        const taskId: number = Number(req?.params.taskId);
        if (taskId < 0 || taskId >= Number.MAX_SAFE_INTEGER) {
          throw new Error("Invalid paramter!");
        }
        res.status(200).send(await service.take(taskId))
      } catch (error) {
        res.sendStatus(500); 
      }
    },

  }

}

