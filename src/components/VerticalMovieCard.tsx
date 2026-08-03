import styled from "styled-components/native";
import { IMovie } from "../types/movies";
import { makeImagePath } from "../utils/makeImagePath";

interface VerticalMovieCardProps {
  movie: IMovie;
}

const VView = styled.View`
  padding-top: 15px;
  padding-left: 15px;
  flex-direction: row;
`;
const VImage = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
const VContent = styled.View`
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 10px;
  justify-content: center;
  flex: 1;
`;
const VOverview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
`;
const VTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding-bottom: 5px;
`;
export default function VerticalMovieCard({ movie }: VerticalMovieCardProps) {
  return (
    <VView>
      <VImage source={{ uri: makeImagePath(movie.poster_path ?? "") }} />
      <VContent>
        <VTitle numberOfLines={1} ellipsizeMode="tail">
          {movie.title}
        </VTitle>
        <Release>{movie.release_date}</Release>
        <VOverview numberOfLines={6} ellipsizeMode="tail">
          {movie.overview.length > 280
            ? `${movie.overview.slice(0, 280)}...`
            : movie.overview}
        </VOverview>
      </VContent>
    </VView>
  );
}
