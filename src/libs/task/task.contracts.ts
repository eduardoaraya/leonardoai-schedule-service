import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export interface ITaskRepository {
  list: () => Promise<ITaskBase[]>;
  query: (request: ITaskQueryRequest) => Promise<ITaskResult[]>;
  create: (request: ITaskCreateRequest) => Promise<ITaskBase>;
  update: (request: ITaskUpdateRequest, id: string) => Promise<ITaskBase>;
  delete: (taskId: string) => Promise<boolean>;
  take: (taskId: string) => Promise<ITaskBase|null>;
}
export interface ITaskService {
  list: () => Promise<ITaskResult[]>;
  query: (request: ITaskQueryRequest) => Promise<ITaskResult[]>;
  create: (request: ITaskCreateRequest) => Promise<boolean>;
  update: (request: ITaskUpdateRequest, taskId: string) => Promise<boolean>;
  delete: (taskId: string) => Promise<boolean>;
  take: (taskId: string) => Promise<ITaskResult|null>;
}
export interface ITaskController {
  list: (req: Request, res: Response) => Promise<Response>;
  query: (req: Request<ITaskQueryRequest>, res: Response) => Promise<Response>;
  create: (req: Request<ITaskCreateRequest>, res: Response) => Promise<Response>;
  update: (req: Request<ITaskUpdateRequest>, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
  take: (req: Request, res: Response) => Promise<Response>;
}
export interface ITaskBase extends TaskBase {}
export interface ITaskResult extends ITaskBase { }
export interface ITaskQueryRequest extends Prisma.TaskWhereInput { }
export interface ITaskCreateRequest extends Prisma.TaskCreateInput { }
export interface ITaskUpdateRequest extends Prisma.TaskUpdateInput { }

const taskBase = Prisma.validator<Prisma.TaskDefaultArgs>()({
  select: {
    duration: true,
    accountId: true,
    startTime: true,
    id: true,
  }
});

type TaskBase = Prisma.TaskGetPayload<typeof taskBase>;

export type TaskControllerFactory = (service: ITaskService) => ITaskController; 
export type TaskControllerHandle = (factory: TaskControllerFactory) => ITaskController; 
