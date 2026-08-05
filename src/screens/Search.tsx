import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { useSearchMovies } from "../hooks/useMovies";
import HorizontalMediaSection from "../components/HorizontalMediaSection";
import { useSearchTV } from "../hooks/useTvs";

const Container = styled.View`
  /* background-color: ${(props) => props.theme.cardBgColor}; */
  flex: 1;
`;
const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  margin: 13px;
  padding-left: 13px;
`;

export default function Search() {
  //const theme = useTheme();
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const { data: movieData, isLoading: movieLoading } = useSearchMovies(keyword);
  const { data: tvData, isLoading: tvLoading } = useSearchTV(keyword);
  const isLoading = movieLoading || tvLoading;
  const movie =
    movieData?.results.map((movie) => ({
      id: movie.id,
      posterPath: movie.poster_path ?? "",
      backdropPath: movie.backdrop_path ?? "",
      overview: movie.overview,
      title: movie.title,
      rating: movie.vote_average,
    })) ?? [];
  const tv =
    tvData?.results.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
      backdropPath: tv.backdrop_path ?? "",
      overview: tv.overview,
      title: tv.name,
      rating: tv.vote_average,
    })) ?? [];
  const onSubmit = async () => {
    setKeyword(text);
    setText("");
  };

  return (
    <Container>
      <TextInput
        placeholder="What do you want to watch?"
        onChangeText={setText}
        value={text}
        onSubmitEditing={onSubmit}
      />
      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          <HorizontalMediaSection
            data={movie}
            title="Movies"
            mediaType="movie"
          />
          <HorizontalMediaSection data={tv} title="TV" mediaType="tv" />
        </>
      )}
    </Container>
  );
}
