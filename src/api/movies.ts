import { IMovieDetail, IMovieResponse } from "../types/movies";
import { fetchAPI } from "./client";

export async function getNowPlaying(): Promise<IMovieResponse> {
  return fetchAPI("/movie/now_playing?language=en-US&page=1");
}

export async function getTopRated(page: number): Promise<IMovieResponse> {
  return fetchAPI(`/movie/top_rated?language=en-US&page=${page}`);
}

export async function getUpcoming(page: number): Promise<IMovieResponse> {
  return fetchAPI(`/movie/upcoming?language=en-US&page=${page}`);
}

export async function getSearchMovies(
  keyword: string,
  page: number,
): Promise<IMovieResponse> {
  return fetchAPI(
    `/search/movie?query=${encodeURIComponent(keyword)}&include_adult=false&language=en-US&page=${page}`,
  );
}

export async function getDetailMovie(id: number): Promise<IMovieDetail> {
  return fetchAPI(`/movie/${id}?language=en-US&append_to_response=videos`);
}
