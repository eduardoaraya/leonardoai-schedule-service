import { ExpressValidator, Meta } from "express-validator";
import { IUserService, IUser } from "@modules/user";

export const isEndtimeBeforeStarttime = (value: string, { req }: Meta) => {
  const [startTime, endTime] = [new Date(req.body.startTime), new Date(value)];
  return startTime.getTime() <= endTime.getTime();
}

export const validateUser = (service: IUserService) => async (value: number) => {
  if (!value) throw new Error("Invalid value!");
  const user = await service.getById(value);
  if (!user?.id) throw new Error(`Invalid user id: ${value}`);
  return true;
}

export const validateAgentDifFromAccount = (value: IUser, { req }: Meta) => {
  return !(value?.id === req?.body?.account?.id);
}

export const toUser = (service: IUserService) => async (value: number) => {
  return service.getById(value, { id: true });
}

export const scheduleRequestValidator = (service: IUserService) => {

  const { checkSchema } = new ExpressValidator({
    isEndtimeBeforeStarttime,
    validateAgentDifFromAccount,
    validateUser: validateUser(service),
  }, {
    toUser: toUser(service)
  });

  return checkSchema({
    account: {
      notEmpty: true,
      isInt: true,
      toInt: true,
      validateUser: true,
      toUser: true,
    },
    agent: {
      notEmpty: true,
      isInt: true,
      toInt: true,
      validateUser: true,
      toUser: true,
      validateAgentDifFromAccount: true
    },
    startTime: {
      notEmpty: true,
      isISO8601: true,
      toDate: true,
    },
    endTime: {
      notEmpty: true,
      isISO8601: true,
      toDate: true,
      isEndtimeBeforeStarttime: true,
    }
  }, ["body"])
};
