import { checkSchema } from "express-validator";

export const scheduleRequestValidator = checkSchema({
  accountId: {
    isInt: true,
    notEmpty: true,
  },
  agentId: {
    isInt: true,
    notEmpty: true,
  },
  startTime: {
    notEmpty: true,
    isISO8601: true,
  },
  endTime: {
    notEmpty: true,
    isISO8601: true,
  }
}, ["body"])

