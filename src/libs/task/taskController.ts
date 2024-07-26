import { Request, Response } from "express";
import { 
  ITaskService,
  ITaskController,
  ITaskQueryRequest,
  ITaskUpdateRequest,
  ITaskCreateRequest
} from "./taskContracts";

export function taskController(service: ITaskService): ITaskController {
  return {
    async list(_req: Request, res: Response): Promise<void> {
      try {
        res.status(200).send(await service.list()); 
      } catch (error) {
        res.status(500).send({ 
          error: error
        }); 
      }
    },
    async query(req: Request<ITaskQueryRequest>, res: Response): Promise<void> {
      try {
        await service.query(req.body);
        res.sendStatus(201); 
      } catch (error) {
        res.status(500).send({ 
          error: error
        }); 
      }
    },
    async create(req: Request<ITaskCreateRequest>, res: Response): Promise<void> {
      try {
        await service.create(req.body);

        res.sendStatus(201); 
      } catch (error) {
        res.status(500).send({ 
          error: error
        }); 
      }
    },
    async update(req: Request<ITaskUpdateRequest>, res: Response): Promise<void> {
      try {
        await service.update(req.body);

        res.sendStatus(201); 
      } catch (error) {
        res.status(500).send({ 
          error: error
        }); 
      }
    },
    async delete(req: Request, res: Response): Promise<void> {
      try {
        const taskId: number = Number(req?.params.id);
        if (taskId < 0 || taskId >= Number.MAX_SAFE_INTEGER) {
          throw new Error("Invalid paramter!");
        }

        await service.delete(taskId)
        res.sendStatus(201); 
      } catch (error) {
        res.status(500).send({ 
          error: error
        }); 
      }
    },
    async take(req: Request, res: Response): Promise<void> {
      try {
        const taskId: number = Number(req?.params.id);
        if (taskId < 0 || taskId >= Number.MAX_SAFE_INTEGER) {
          throw new Error("Invalid paramter!");
        }

        res.status(200).send(await service.take(taskId))
      } catch (error) {
        res.status(500).send({ 
          error: error
        }); 
      }
    },

  }

}

