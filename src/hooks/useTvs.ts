import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getAiringToday,
  getDetailTv,
  getPopular,
  getSearchTV,
  getTopRatedTV,
} from "../api/tvs";
import { ITvDetail, ITvResponse } from "../types/tv";

export function useAiringToday() {
  return useInfiniteQuery<ITvResponse>({
    queryKey: ["tv", "today"],
    queryFn: ({ pageParam = 1 }) => getAiringToday(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return allPage.length + 1;
      }
      return null;
    },
  });
}

export function usePopularTv() {
  return useInfiniteQuery<ITvResponse>({
    queryKey: ["tv", "popular"],
    queryFn: ({ pageParam = 1 }) => getPopular(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return allPage.length + 1;
      }
      return null;
    },
  });
}
export function useTopRatedTV() {
  return useInfiniteQuery<ITvResponse>({
    queryKey: ["tv", "topRated"],
    queryFn: ({ pageParam = 1 }) => getTopRatedTV(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return allPage.length + 1;
      }
      return null;
    },
  });
}

export function useSearchTV(keyword: string) {
  return useInfiniteQuery<ITvResponse>({
    queryKey: ["tv", "search", keyword],
    queryFn: ({ pageParam = 1 }) => getSearchTV(keyword, pageParam as number),
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

export function useTvDetail(id: number, enabled: boolean) {
  return useQuery<ITvDetail>({
    queryKey: ["tv", id],
    queryFn: () => getDetailTv(id),
    enabled,
  });
}
