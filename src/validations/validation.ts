import { Validator, ValidationError } from "jsonschema";
import { RouterContext } from "koa-router";
import { petsSchema, usersSchema } from "./schema";

const v = new Validator();

export const validatePet = async (ctx: RouterContext, next: any) => {
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false,
    }
    const body = ctx.request.body
    try {
        v.validate(body, petsSchema, validationOptions)
        await next()
    } catch (err: any) {
        if (err instanceof ValidationError) {
            ctx.status = 400
            ctx.body = { message: err.message }
        } else {
            throw err
        }
    }
}

export const validateUser = async (ctx: RouterContext, next: any) => {
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false,
    }
    const body = ctx.request.body
    try {
        v.validate(body, usersSchema, validationOptions)
        await next()
    } catch (err: any) {
        if (err instanceof ValidationError) {
            ctx.status = 400
            ctx.body = { message: err.message }
        } else {
            throw err
        }
    }
}