import { IMovieResponse } from "../types/movies";
import { fetchAPI } from "./client";

export async function getNowPlaying(): Promise<IMovieResponse> {
  return fetchAPI("/movie/now_playing?language=en-US&page=1");
}

export async function getTopRated(): Promise<IMovieResponse> {
  return fetchAPI("/movie/top_rated?language=en-US&page=1");
}
