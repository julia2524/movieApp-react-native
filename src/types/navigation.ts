export type RootStackParamList = {
  Tabs: undefined;
  Details: DetailParams;
};
export type DetailParams = {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  mediaType: "movie" | "tv";
};
