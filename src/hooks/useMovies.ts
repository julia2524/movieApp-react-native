import { useQuery } from "@tanstack/react-query";
import {
  getDetailMovie,
  getNowPlaying,
  getSearchMovies,
  getTopRated,
  getUpcoming,
} from "../api/movies";
import { IMovieDetail, IMovieResponse } from "../types/movies";

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

export function useMovieDetail(id: number, enabled: boolean) {
  return useQuery<IMovieDetail>({
    queryKey: ["movie", id],
    queryFn: () => getDetailMovie(id),
    enabled,
  });
}
