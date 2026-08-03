import styled from "styled-components/native";
import { IMovie } from "../types/movies";
import { makeImagePath } from "../utils/makeImagePath";

interface HorizontalMovieListProps {
  movie: IMovie;
}
const HItem = styled.View`
  margin-right: 15px;
  margin-top: 8px;
`;
const HImage = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
const HContent = styled.View`
  flex-direction: column;
  width: 120px;

  margin-bottom: 5px;
`;
const HTitle = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
`;
const HRate = styled.Text`
  color: #a0a0a0;
  font-size: 13px;
  text-align: center;
`;

export default function HorizontalMovieList({
  movie,
}: HorizontalMovieListProps) {
  return (
    <HItem>
      <HImage source={{ uri: makeImagePath(movie.poster_path ?? "") }} />
      <HContent>
        <HTitle numberOfLines={1} ellipsizeMode="tail">
          {movie.title.length > 15
            ? `${movie.title.slice(0, 15)}...`
            : movie.title}
        </HTitle>
        <HRate>⭐️ {movie.vote_average.toFixed(1)} / 10</HRate>
      </HContent>
    </HItem>
  );
}
