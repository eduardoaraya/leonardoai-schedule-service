import { Request, Response } from "express";
import { 
  IUserService,
  IUserController,
  IUserQueryRequest,
  IUserUpdateRequest,
  IUserCreateRequest,
  IUser
} from "@modules/user";
import { validationResult } from "express-validator";

export function userController(service: IUserService): IUserController {
  return {
    async list(_req: Request, res: Response): Promise<Response> {
      try {
        const result = await service.list();
        return res.status(200).send(result); 
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
    async query(req: Request<IUserQueryRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(412).send({ errors: validation.array() });
        const result = await service.query(req.body);
        return res.status(200).send(result); 
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
    async create(req: Request<IUserCreateRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(412).send({ errors: validation.array() });

        await service.create(req.body);
        return res.sendStatus(201); 
      } catch (error) {
        return res.status(500).send({ error });
      }
    },
    async update(req: Request<IUserUpdateRequest>, res: Response): Promise<Response> {
      try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
          return res.status(412).send({ errors: validation.array() });

        await service.update(req.body, req.body?.id);
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(500);
      }
    },
    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const userId: number = Number(req?.params.userId);
        if (userId < 0 || userId >= Number.MAX_SAFE_INTEGER)
          throw new Error("Invalid paramter!");
        

        await service.delete(userId)
        return res.sendStatus(201); 
      } catch (error) {
        return res.sendStatus(500);
      }
    },
    async getById(req: Request, res: Response<IUser>): Promise<Response> {
      try {
        const userId: number = Number(req?.params.userId);
        if (userId < 0 || userId >= Number.MAX_SAFE_INTEGER)
          throw new Error("Invalid paramter!");
 
        const user = await service.getById(userId);
        if (!user) return res.sendStatus(404);

        return res.status(200).send(user);
      } catch (error) {
        return res.sendStatus(500); 
      }
    },
  }
}

