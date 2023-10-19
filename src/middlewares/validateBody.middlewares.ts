import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { ZodError, ZodTypeAny } from "zod";

const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | unknown> => {
    try {
      const validateData = schema.parse(req.body);
      req.body = validateData;
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: err.flatten().fieldErrors,
        });
      }
      return next(new AppError(err.message, 400));
    }
    return next();
  };

export { validateBodyMiddleware };
