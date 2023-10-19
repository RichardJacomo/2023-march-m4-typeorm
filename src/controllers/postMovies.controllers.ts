import { Request, Response } from "express";
import { createMovieService } from "../services/postMovies.services";

const createMovieController = async (req: Request, res: Response) => {
  const movie = await createMovieService(req.body);
  return res.status(201).json(movie);
};

export { createMovieController };
