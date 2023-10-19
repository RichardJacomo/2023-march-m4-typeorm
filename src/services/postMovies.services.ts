import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { ImoviesPayload } from "../interfaces/movies.interfaces";

const createMovieService = async (payload: ImoviesPayload): Promise<Movie> => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const movie = movieRepo.create(payload);

  await movieRepo.save(movie);

  return movie;
};

export { createMovieService };
