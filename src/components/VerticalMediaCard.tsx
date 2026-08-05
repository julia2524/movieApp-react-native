import styled from "styled-components/native";
import { IMovie } from "../types/movies";
import { makeImagePath } from "../utils/makeImagePath";
import { useNavigation } from "@react-navigation/native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

interface VerticalMediaCardProps {
  movie: IMovie;
}

const VView = styled.Pressable`
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
  color: ${(props) => props.theme.subTextColor};
  font-size: 12px;
`;
const VTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Release = styled.Text`
  color: ${(props) => props.theme.subTextColor};
  font-size: 12px;
  font-weight: bold;
  padding-bottom: 5px;
`;
export default function VerticalMediaCard({ movie }: VerticalMediaCardProps) {
  const navigation = useNavigation<any>();
  return (
    <VView
      onPress={() =>
        navigation.navigate("Details", {
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          overview: movie.overview,
          mediaType: "movie",
        })
      }
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
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
