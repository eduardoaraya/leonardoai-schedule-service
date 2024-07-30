import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export interface IScheduleRepository {
  list: () => Promise<IScheduleBase[]>;
  query: (request: IScheduleQueryRequest) => Promise<IScheduleResult[]>;
  create: (request: IScheduleCreateRequest) => Promise<IScheduleBase>;
  update: (request: IScheduleUpdateRequest, id: string) => Promise<IScheduleBase>;
  delete: (scheduleId: string) => Promise<boolean>;
  take: (scheduleId: string) => Promise<IScheduleBase|null>;
}
export interface IScheduleService {
  list: () => Promise<IScheduleResult[]>;
  query: (request: IScheduleQueryRequest) => Promise<IScheduleResult[]>;
  create: (request: IScheduleCreateRequest) => Promise<boolean>;
  update: (request: IScheduleUpdateRequest, scheduleId: string) => Promise<boolean>;
  delete: (scheduleId: string) => Promise<boolean>;
  take: (scheduleId: string) => Promise<IScheduleResult|null>;
}
export interface IScheduleController {
  list: (req: Request, res: Response) => Promise<Response>;
  query: (req: Request<IScheduleQueryRequest>, res: Response) => Promise<Response>;
  create: (req: Request<IScheduleCreateRequest>, res: Response) => Promise<Response>;
  update: (req: Request<IScheduleUpdateRequest>, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
  take: (req: Request, res: Response) => Promise<Response>;
}
export interface IScheduleBase extends ScheduleBase {}
export interface IScheduleResult extends IScheduleBase { }
export interface IScheduleQueryRequest extends Prisma.ScheduleWhereInput { }
export interface IScheduleCreateRequest extends Prisma.ScheduleCreateInput { }
export interface IScheduleUpdateRequest extends Prisma.ScheduleUpdateInput { }

const scheduleBase = Prisma.validator<Prisma.ScheduleDefaultArgs>()({
  select: {}
});

type ScheduleBase = Prisma.ScheduleGetPayload<typeof scheduleBase>;

export type ScheduleControllerFactory = (service: IScheduleService) => IScheduleController; 
export type ScheduleControllerHandle = (factory: ScheduleControllerFactory) => IScheduleController; 
