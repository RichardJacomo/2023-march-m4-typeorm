import { Router } from "express";
import { createMovieController } from "../controllers/postMovies.controllers";
import { listMoviesController } from "../controllers/getMovies.controllers";
import { validateBodyMiddleware } from "../middlewares/validateBody.middlewares";
import { updateMovieController } from "../controllers/patchMovie.controllers";
import { nameExistsMiddleware } from "../middlewares/nameExists.middleware";
import { idExistsMiddleware } from "../middlewares/idExists.middleware";
import { deleteMovieController } from "../controllers/deleteMovie.controllers";
import { postMovieSchema } from "../schemas/postMovies.schemas";
import { pacthMovieSchema } from "../schemas/patchMovie.schemas";

const router: Router = Router();

router.post(
  "",
  nameExistsMiddleware,
  validateBodyMiddleware(postMovieSchema),
  createMovieController
);
router.get("", listMoviesController);
router.patch(
  "/:id",
  idExistsMiddleware,
  nameExistsMiddleware,
  validateBodyMiddleware(pacthMovieSchema),
  updateMovieController
);
router.delete("/:id", idExistsMiddleware, deleteMovieController);

export default router;
