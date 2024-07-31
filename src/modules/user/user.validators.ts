import { checkSchema } from "express-validator";

export const userRequestValidator = checkSchema({
  email: {
    notEmpty: true,
    isEmail: true
  },
  name: {
    notEmpty: true,
    isString: true,
  }
}, ["body"])

