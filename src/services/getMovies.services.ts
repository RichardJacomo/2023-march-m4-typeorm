import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movies.entity";
import { ImoviesReturn } from "../interfaces/movies.interfaces";

const listMoviesService = async (query: any): Promise<ImoviesReturn> => {
  const movieRepo = AppDataSource.getRepository(Movie);

  let page = Number(query.page);
  let perPage = Number(query.perPage);
  let order = query.order;
  let sort = query.sort;
  let duration;
  let price;

  if (typeof page !== "number" || page <= 0 || !page) {
    page = 1;
  }
  if (typeof perPage !== "number" || perPage <= 0 || perPage > 5 || !perPage) {
    perPage = 5;
  }
  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }
  if (!sort) {
    order = "asc";
  }

  let findMovies;
  if (sort === "price") {
    price = sort;
    findMovies = await movieRepo.find({
      take: Number(perPage),
      skip: (Number(page) - 1) * Number(perPage),
      order: {
        price: order,
      },
    });
  } else if (sort === "duration") {
    duration = sort;
    findMovies = await movieRepo.find({
      take: Number(perPage),
      skip: (Number(page) - 1) * Number(perPage),
      order: {
        duration: order,
      },
    });
  } else {
    findMovies = await movieRepo.find({
      take: Number(perPage),
      skip: (Number(page) - 1) * Number(perPage),
      order: {
        id: order,
      },
    });
  }

  const allMovies = await movieRepo.find();

  let prevPage;
  let nextPage;
  let count = allMovies.length;
  let data = findMovies;
  let numPagesTotal = count / perPage;

  if (page === 0 || page === 1) {
    prevPage = null;
  } else if (page >= 2) {
    prevPage = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  }

  if (page > numPagesTotal) {
    nextPage = null;
  } else if (page < numPagesTotal) {
    nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`;
  }

  nextPage =
    page === 0
      ? `http://localhost:3000/movies?page=2&perPage=${perPage}`
      : nextPage;

  const resultMovies = {
    prevPage: prevPage || null,
    nextPage: nextPage || null,
    count: count,
    data: data,
  };

  return resultMovies;
};

export { listMoviesService };
