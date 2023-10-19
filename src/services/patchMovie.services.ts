import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { ImoviesPayload } from "../interfaces/movies.interfaces";

const updateMovieService = async (
  id: number,
  payload: ImoviesPayload
): Promise<Movie | null> => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const payloadResult = {
    name: payload.name,
    description: payload.description,
    duration: payload.duration,
    price: payload.price,
  };
  await movieRepo.update({ id }, payloadResult);
  const updatedMovie = await movieRepo.findOneBy({ id: id });
  return updatedMovie;
};

export { updateMovieService };
