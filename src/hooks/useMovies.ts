import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNowPlaying } from "../api/movies";
import { IMovieResponse } from "../types/movies";

export function useNowPlaying() {
  // Access the client
  const queryClient = useQueryClient();
  // Queries
  return useQuery<IMovieResponse>({
    queryKey: ["movies", "now"],
    queryFn: getNowPlaying,
  });
}
