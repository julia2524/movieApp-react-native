import { fetchAPI } from "./client";

export async function getPopular() {
  return fetchAPI("/tv/popular?language=en-US&page=1");
}
