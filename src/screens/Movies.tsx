import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, useWindowDimensions } from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import styled from "styled-components/native";
import {
  useNowPlaying,
  useTopRatedMovies,
  useUpcomingMovies,
} from "../hooks/useMovies";

import VerticalMovieCard from "../components/VerticalMovieCard";
import HorizontalMovieList from "../components/HorizontalMovieList";
import MovieCarousel from "../components/MovieCarousel";

const Container = styled.View`
  /* background-color: ${(props) => props.theme.mainBgColor}; */
  flex: 1;
`;

const HView = styled.View`
  flex: 1;
  padding-left: 15px;
`;

const CategoryTitle = styled.Text`
  padding-top: 15px;
  padding-left: 15px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export default function Movies() {
  // const theme = useTheme();
  const { width, height } = useWindowDimensions();

  const { data: nowData, isLoading: nowLoading } = useNowPlaying();
  const { data: topData, isLoading: topLoading } = useTopRatedMovies();
  const { data: upcomingData, isLoading: upcomingLoading } =
    useUpcomingMovies();
  const isLoading = nowLoading || topLoading || upcomingLoading;
  return isLoading ? (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <Container>
      <>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <>
              <Carousel
                loop
                autoplay
                style={{ width, height: height / 4 }}
                data={nowData?.results ?? []}
                renderItem={({ item }) => <MovieCarousel movie={item} />}
              />
              <CategoryTitle>Top Rated</CategoryTitle>
              <HView>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  data={topData?.results ?? []}
                  renderItem={({ item }) => (
                    <HorizontalMovieList movie={item} />
                  )}
                />
              </HView>
              <CategoryTitle>Upcoming</CategoryTitle>
            </>
          }
          data={upcomingData?.results ?? []}
          renderItem={({ item }) => <VerticalMovieCard movie={item} />}
        />
      </>
    </Container>
  );
}
