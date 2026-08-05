import { useQuery } from "@tanstack/react-query";
import {
  getAiringToday,
  getDetailTv,
  getPopular,
  getSearchTV,
  getTopRatedTV,
} from "../api/tvs";
import { ITvDetail, ITvResponse } from "../types/tv";

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

export function useSearchTV(keyword: string) {
  return useQuery<ITvResponse>({
    queryKey: ["tv", "search", keyword],
    queryFn: () => getSearchTV(keyword),
    enabled: keyword.trim().length > 0,
  });
}

export function useTvDetail(id: number, enabled: boolean) {
  return useQuery<ITvDetail>({
    queryKey: ["tv", id],
    queryFn: () => getDetailTv(id),
    enabled,
  });
}
