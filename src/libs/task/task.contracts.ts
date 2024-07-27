import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export interface ITaskRepository {
  list: () => Promise<ITaskBase[]>;
  query: (request: ITaskQueryRequest) => Promise<ITaskResult[]>;
  create: (request: ITaskBase) => Promise<ITaskBase>;
  update: (request: ITaskBase) => Promise<ITaskBase>;
  delete: (taskId: number) => Promise<void>;
  take: (taskId: number) => Promise<ITaskResult>;
}
export interface ITaskService {
  list: () => Promise<ITaskResult[]>;
  query: (request: ITaskQueryRequest) => Promise<ITaskResult[]>;
  create: (request: ITaskCreateRequest) => Promise<boolean>;
  update: (request: ITaskUpdateRequest) => Promise<boolean>;
  delete: (taskId: number) => Promise<boolean>;
  take: (taskId: number) => Promise<ITaskResult>;
}
export interface ITaskController {
  list: (req: Request, res: Response) => Promise<void>;
  query: (req: Request<ITaskQueryRequest>, res: Response) => Promise<void>;
  create: (req: Request<ITaskCreateRequest>, res: Response) => Promise<void>;
  update: (req: Request<ITaskUpdateRequest>, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
  take: (req: Request, res: Response) => Promise<void>;
}
export interface ITaskBase extends TaskUpdate {}
export interface ITaskResult extends ITaskBase { }
export interface ITaskQueryRequest extends ITaskBase { }
export interface ITaskCreateRequest extends ITaskBase { }
export interface ITaskUpdateRequest extends ITaskBase { }

const taskUpdate = Prisma.validator<Prisma.TaskDefaultArgs>()({
  select: {
    duration: true,
    startTime: true,
    accountId: true,
    id: true,
  }
});
type TaskUpdate = Prisma.TaskGetPayload<typeof taskUpdate>;
