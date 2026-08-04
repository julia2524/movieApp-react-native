import { useQuery } from "@tanstack/react-query";
import { getAiringToday, getPopular, getTopRatedTV } from "../api/tvs";
import { ITvResponse } from "../types/tv";

export function useAiringToday() {
  return useQuery<ITvResponse>({
    queryKey: ["tv", "today"],
    queryFn: getAiringToday,
  });
}

export function usePopularTv() {
  return useQuery<ITvResponse>({
    queryKey: ["tv", "popular"],
    queryFn: getPopular,
  });
}
export function useTopRatedTV() {
  return useQuery<ITvResponse>({
    queryKey: ["tv", "topRated"],
    queryFn: getTopRatedTV,
  });
}
