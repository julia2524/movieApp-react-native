import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
  return useInfiniteQuery<IMovieResponse>({
    queryKey: ["movies", "top"],
    queryFn: ({ pageParam = 1 }) => getTopRated(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return allPage.length + 1;
      }
      return null;
    },
  });
}

export function useUpcomingMovies() {
  return useInfiniteQuery<IMovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: ({ pageParam = 1 }) => getUpcoming(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return allPage.length + 1;
      }
      return null;
    },
  });
}

export function useSearchMovies(keyword: string) {
  return useInfiniteQuery<IMovieResponse>({
    queryKey: ["movies", "search", keyword],
    queryFn: ({ pageParam = 1 }) =>
      getSearchMovies(keyword, pageParam as number),
    enabled: keyword.trim().length > 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return allPage.length + 1;
      }
      return null;
    },
  });
}

export function useMovieDetail(id: number, enabled: boolean) {
  return useQuery<IMovieDetail>({
    queryKey: ["movie", id],
    queryFn: () => getDetailMovie(id),
    enabled,
  });
}
