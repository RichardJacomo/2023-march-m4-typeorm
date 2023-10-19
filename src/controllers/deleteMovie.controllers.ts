import { Request, Response } from "express";
import deleteMovieService from "../services/deleteMovie.services";

const deleteMovieController = async (req: Request, res: Response) => {
  await deleteMovieService(parseInt(req.params.id));

  return res.status(204).send();
};

export { deleteMovieController };
