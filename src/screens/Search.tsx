import { useState } from "react";
import { Text, View } from "react-native";
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
  const movie =
    movieData?.results.map((movie) => ({
      id: movie.id,
      posterPath: movie.poster_path ?? "",
      title: movie.title,
      rating: movie.vote_average,
    })) ?? [];
  const tv =
    tvData?.results.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
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
      <HorizontalMediaSection data={movie} title="Movies" />
      <HorizontalMediaSection data={tv} title="TV" />
    </Container>
  );
}
