import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, getTopRated } from "../api/movies";
import { IMovieResponse } from "../types/movies";

export function useNowPlaying() {
  // Queries
  return useQuery<IMovieResponse>({
    queryKey: ["movies", "now"],
    queryFn: getNowPlaying,
  });
}

export function useTopRatedMovies() {
  return useQuery<IMovieResponse>({
    queryKey: ["movies", "top"],
    queryFn: getTopRated,
  });
}
