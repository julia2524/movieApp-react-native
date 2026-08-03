import styled from "styled-components/native";

import { StyleSheet } from "react-native";

import { BlurView } from "expo-blur";
import { makeImagePath } from "../utils/makeImagePath";
import { IMovie } from "../types/movies";

interface MovieCarouselProps {
  movie: IMovie;
}

const CarouselItem = styled.View`
  flex: 1;
`;
const BackgroundImg = styled.Image`
  width: 100%;
  height: 100%;
`;
const ItemDetail = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  padding-bottom: 40px;
`;
const Title = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Poster = styled.Image`
  width: 100px;
  height: 140px;
  border-radius: 5px;
  margin-right: 15px;
`;
const Column = styled.View`
  flex: 1;
  justify-content: center;
`;
const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
`;
export default function MovieCarousel({ movie }: MovieCarouselProps) {
  return (
    <CarouselItem>
      <BackgroundImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(movie.backdrop_path ?? "") }}
      />
      <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill}>
        <ItemDetail>
          <Poster
            source={{
              uri: makeImagePath(movie.poster_path ?? ""),
            }}
          />
          <Column>
            <Title numberOfLines={1}>{movie.title}</Title>
            <Overview numberOfLines={6}>
              {movie.overview.length > 280
                ? `${movie.overview.slice(0, 280)}...`
                : movie.overview}
            </Overview>
          </Column>
        </ItemDetail>
      </BlurView>
    </CarouselItem>
  );
}
