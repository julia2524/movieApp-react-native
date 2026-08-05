import { ITvDetail, ITvResponse } from "../types/tv";
import { fetchAPI } from "./client";

export async function getAiringToday(page: number): Promise<ITvResponse> {
  return fetchAPI(`/tv/airing_today?language=en-US&page=${page}`);
}
export async function getPopular(page: number): Promise<ITvResponse> {
  return fetchAPI(`/tv/popular?language=en-US&page=${page}`);
}
export async function getTopRatedTV(page: number): Promise<ITvResponse> {
  return fetchAPI(`/tv/top_rated?language=en-US&page=${page}`);
}

export async function getSearchTV(
  keyword: string,
  page: number,
): Promise<ITvResponse> {
  return fetchAPI(
    `/search/tv?query=${encodeURIComponent(keyword)}&include_adult=false&language=en-US&page=${page}`,
  );
}

export async function getDetailTv(id: number): Promise<ITvDetail> {
  return fetchAPI(`/tv/${id}?language=en-US&append_to_response=videos`);
}
