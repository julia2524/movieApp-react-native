import { IMovieResponse } from "../types/movies";
import { fetchAPI } from "./client";

export async function getNowPlaying(): Promise<IMovieResponse> {
  return fetchAPI("/movie/now_playing?language=en-US&page=1");
}
