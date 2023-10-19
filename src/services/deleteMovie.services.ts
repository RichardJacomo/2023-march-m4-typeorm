import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const deleteMovieService = async (id: number): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  const user = await movieRepository.findOne({
    where: {
      id: id,
    },
  });

  await movieRepository.remove(user!);
};

export default deleteMovieService;
