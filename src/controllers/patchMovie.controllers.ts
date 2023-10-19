import { Request, Response } from "express";
import { updateMovieService } from "../services/patchMovie.services";

const updateMovieController = async (req: Request, res: Response) => {
  const movie = await updateMovieService(Number(req.params.id), req.body);
  return res.status(200).json(movie);
};

export { updateMovieController };
