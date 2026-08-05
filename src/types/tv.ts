export interface ITv {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  name: string;
  vote_average: number;
}
export interface ITvResponse {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
export interface ITvVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
}
export interface ITvDetail {
  videos: { results: ITvVideo[] };
}
