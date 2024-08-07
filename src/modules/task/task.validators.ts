import { ExpressValidator } from "express-validator";
import { toSchedule } from "@modules/schedule";
import { ITaskModule, TaskTypesConst } from "./task.contracts";

export const taskExpressValidator = (module: ITaskModule) => new ExpressValidator({}, {
  toSchedule: toSchedule(module.scheduleService),
});

export const createSchema = (module: ITaskModule) => {
  return taskExpressValidator(module).checkSchema({
    schedule: {
      notEmpty: true,
      isString: true,
      toSchedule: true,
    },
    startTime: {
      notEmpty: true,
      isISO8601: true,
      toDate: true,
    },
    duration: {
      isInt: true,
      notEmpty: true,
    },
    type: {
      isIn: {
        options: [[TaskTypesConst.work, TaskTypesConst.break]]
      }
    }
  }, ["body"])
}

export const updateSchema = (module: ITaskModule) => {
  return taskExpressValidator(module).checkSchema({
    schedule: {
      notEmpty: true,
      isString: true,
      toSchedule: true,
    },
    startTime: {
      notEmpty: true,
      isISO8601: true,
      toDate: true,
    },
    duration: {
      isInt: true,
      notEmpty: true,
    },
    type: {
      isIn: {
        options: [[TaskTypesConst.work, TaskTypesConst.break]]
      }
    }
  }, ["body"]);
}

export const searchSchema = () => {
  return new ExpressValidator({}).checkSchema({
    startTime: {
      optional: true,
      isISO8601: true,
      toDate: true,
    },
    type: {
      isIn: {
        options: [[TaskTypesConst.work, TaskTypesConst.break]]
      }
    }
  }, ["query"])
}

