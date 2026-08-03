import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import styled, { useTheme } from "styled-components/native";
import { useNowPlaying } from "../hooks/useMovies";
import { makeImagePath } from "../utils/makeImagePath";
import { BlurView } from "expo-blur";

const Container = styled.View`
  /* background-color: ${(props) => props.theme.mainBgColor}; */
  flex: 1;
`;
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

export default function Movies() {
  // const theme = useTheme();
  const { width, height } = useWindowDimensions();

  const { data, isLoading } = useNowPlaying();
  console.log(data);

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Carousel
          loop
          autoplay
          style={{ width, height: height / 4 }}
          data={data?.results ?? []}
          renderItem={({ item }) => (
            <CarouselItem>
              <BackgroundImg
                style={StyleSheet.absoluteFill}
                source={{ uri: makeImagePath(item.backdrop_path ?? "") }}
              />
              <BlurView
                intensity={90}
                tint="dark"
                style={StyleSheet.absoluteFill}
              >
                <ItemDetail>
                  <Poster
                    source={{ uri: makeImagePath(item.poster_path ?? "") }}
                  />
                  <Column>
                    <Title numberOfLines={1}>{item.title}</Title>
                    <Overview numberOfLines={6}>
                      {item.overview.length > 280
                        ? `${item.overview.slice(0, 280)}...`
                        : item.overview}
                    </Overview>
                  </Column>
                </ItemDetail>
              </BlurView>
            </CarouselItem>
          )}
        />
      )}
    </Container>
  );
}
