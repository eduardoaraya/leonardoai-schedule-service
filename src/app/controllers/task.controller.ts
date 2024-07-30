import { Request, Response } from "express";
import { 
  ITaskService,
  ITaskController,
  ITaskQueryRequest,
  ITaskUpdateRequest,
  ITaskCreateRequest,
  ITaskBase
} from "../../libs/task/task.contracts"

export function taskController(service: ITaskService): ITaskController {
  return {
    async list(_req: Request, res: Response): Promise<Response> {
      try {
        const result = await service.list();
        return res.status(200).send(result); 
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
    async query(req: Request<ITaskQueryRequest>, res: Response): Promise<Response> {
      try {
        const result = await service.query(req.body);
        return res.status(200).send(result); 
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
    async create(req: Request<ITaskCreateRequest>, res: Response): Promise<Response> {
      try {
        await service.create(req.body);
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(500);
      }
    },
    async update(req: Request<ITaskUpdateRequest>, res: Response): Promise<Response> {
      try {
        await service.update(req.body, req.body?.id);
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(500);
      }
    },
    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const taskId: string = String(req?.params.taskId);
        if (!taskId)
          throw new Error("Invalid paramter!");
 
        const result = await service.take(taskId);
        if (!result) return res.sendStatus(404);

        await service.delete(taskId)
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(500);
      }
    },
    async take(req: Request, res: Response<ITaskBase>): Promise<Response> {
      try {
        const taskId: string = String(req?.params.taskId);
        const result = await service.take(taskId);
        if (!result) return res.sendStatus(404);

        return res.status(200).send(result)
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
  }
}
