import { IUserService, IUserModule, IUserRepository } from "./user.contracts";
import { ExpressValidator, Meta } from "express-validator";

export const validateUser = (service: IUserService) => async (value: number) => {
  if (!value) throw new Error("Invalid value!");
  const user = await service.getById(value, { id: true });
  if (!user?.id) throw new Error(`Invalid user id: ${value}`);
  return true;
}

export const validateEmailExist = (repository: IUserRepository) => async (value: string, { req }: Meta) => {
  const query = req?.body?.userId ? {
    email: value,
    id: { not: req?.body?.userId }
  } : {
    email: value
  };
  const result = await repository.query(query, { id: true, email: true });
  if (result.length > 0) throw new Error("Email already in use!");
  return true;
}

export const toUser = (service: IUserService) => async (value: number) => {
  return service.getById(value, { id: true });
}

export const userExpressValidator = (module: IUserModule) => new ExpressValidator({
  validateUser: validateUser(module.service),
  validateEmailExist: validateEmailExist(module.repository)
}, {
  toUser: toUser(module.service)
});

export const createSchema = (module: IUserModule) => {
  return userExpressValidator(module).checkSchema({
      email: {
        notEmpty: true,
        isEmail: true,
        validateEmailExist: true,
      },
      name: {
        notEmpty: true,
        isString: true,
      }
    }, ["body"])
}

export const updateSchema = (module: IUserModule) => {
  return userExpressValidator(module).checkSchema({
      userId: {
        isInt: true,
        toInt: true,
        notEmpty: true,
        validateUser: true,
      },
      email: {
        notEmpty: true,
        isEmail: true,
        validateEmailExist: true
      },
      name: {
        notEmpty: true,
        isString: true,
      }
    }, ["body"]);
}

export const searchSchema = () => {
  return new ExpressValidator({}).checkSchema({
    email: {
      isEmail: true,
      optional: true,
    },
    name: {
      isString: true,
      optional: true,
    }
  }, ["query"])
}
