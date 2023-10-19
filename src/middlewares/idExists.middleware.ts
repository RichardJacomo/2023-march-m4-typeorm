import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const idExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieRepo = AppDataSource.getRepository(Movie);
    const findMovieById = await movieRepo.findOneBy({
      id: Number(req.params.id),
    });
    if (!findMovieById) {
      return next(new AppError("Movie not found", 404));
    }
  } catch (err: any) {
    return next(new AppError(err.message));
  }
  next();
};

export { idExistsMiddleware };
