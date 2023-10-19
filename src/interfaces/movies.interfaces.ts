import { Movie } from "../entities";

export interface ImoviesPayload {
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface ImoviesReturn {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Movie[];
}
