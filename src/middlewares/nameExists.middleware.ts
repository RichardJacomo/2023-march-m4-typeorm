import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const nameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieRepo = AppDataSource.getRepository(Movie);

    const findMovieByName = await movieRepo.findOneBy({
      name: req.body.name,
    });

    if (findMovieByName && req.body.name) {
      return next(new AppError("Movie already exists.", 409));
    }
  } catch (err: any) {
    return next(new AppError(err.message));
  }
  next();
};

export { nameExistsMiddleware };
