import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../api/tvs";

export function usePopularTvs() {
  return useQuery({ queryKey: ["tv", "popular"], queryFn: getPopular });
}
