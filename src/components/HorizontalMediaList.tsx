import styled from "styled-components/native";
import { IMovie } from "../types/movies";
import { makeImagePath } from "../utils/makeImagePath";

interface HorizontalMediaListProps {
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
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
  font-weight: bold;
  text-align: center;
`;
const HRate = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  font-size: 13px;
  text-align: center;
`;

export default function HorizontalMediaList({
  movie,
}: HorizontalMediaListProps) {
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
