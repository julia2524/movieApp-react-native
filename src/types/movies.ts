export interface IMovie {
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface IMovieResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
}
export interface IMovieDetail {
  videos: { results: IMovieVideo[] };
}
