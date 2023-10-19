import { Request, Response } from "express";
import { listMoviesService } from "../services/getMovies.services";

const listMoviesController = async (req: Request, res: Response) => {
  const movies = await listMoviesService(req.query);
  return res.status(200).json(movies);
};

export { listMoviesController };
