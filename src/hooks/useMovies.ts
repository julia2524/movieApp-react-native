import { useQuery } from "@tanstack/react-query";
import {
  getNowPlaying,
  getSearchMovies,
  getTopRated,
  getUpcoming,
} from "../api/movies";
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

export function useUpcomingMovies() {
  return useQuery<IMovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: getUpcoming,
  });
}

export function useSearchMovies(keyword: string) {
  return useQuery<IMovieResponse>({
    queryKey: ["movies", "search", keyword],
    queryFn: () => getSearchMovies(keyword),
    enabled: keyword.trim().length > 0,
  });
}
