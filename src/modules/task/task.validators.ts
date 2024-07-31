import { checkSchema } from "express-validator";

export const taskRequestValidator = checkSchema({
  scheduleId: {
    isString: true,
    notEmpty: true,
  },
  startTime: {
    isISO8601: true,
    notEmpty: true,
  },
  duration: {
    isInt: true,
    notEmpty: true
  },
  type: {
    notEmpty: true,
    isIn: { options: [["work", "break"]] }
  }
}, ["body"])

