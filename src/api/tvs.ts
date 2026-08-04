import { ITvResponse } from "../types/tv";
import { fetchAPI } from "./client";

export async function getAiringToday(): Promise<ITvResponse> {
  return fetchAPI("/tv/airing_today?language=en-US&page=1");
}
export async function getPopular(): Promise<ITvResponse> {
  return fetchAPI("/tv/popular?language=en-US&page=1");
}
export async function getTopRatedTV(): Promise<ITvResponse> {
  return fetchAPI("/tv/top_rated?language=en-US&page=1");
}

export async function getSearchTV(keyword: string): Promise<ITvResponse> {
  return fetchAPI(
    `/search/tv?query=${encodeURIComponent(keyword)}&include_adult=false&language=en-US&page=1`,
  );
}
