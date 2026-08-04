export interface ITv {
  backdrop_path: string | null;
  id: number;
  overview: SVGStringList;
  name: string;
  poster_path: string | null;
  vote_average: number;
}
export interface ITvResponse {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
