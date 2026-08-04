import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import styled from "styled-components/native";
import {
  useNowPlaying,
  useTopRatedMovies,
  useUpcomingMovies,
} from "../hooks/useMovies";
import MovieCarousel from "../components/MovieCarousel";
import HorizontalMediaList from "../components/HorizontalMediaList";
import VerticalMediaCard from "../components/VerticalMediaCard";
import { useState } from "react";

const Container = styled.View`
  /* background-color: ${(props) => props.theme.cardBgColor}; */
  flex: 1;
`;

const HView = styled.View`
  flex: 1;
  padding-left: 15px;
`;

const CategoryTitle = styled.Text`
  padding-top: 15px;
  padding-left: 15px;
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export default function Movies() {
  // const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: nowData,
    isLoading: nowLoading,
    refetch: nowRefetch,
  } = useNowPlaying();
  const {
    data: topData,
    isLoading: topLoading,
    refetch: topRefetch,
  } = useTopRatedMovies();
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    refetch: upcomingRefetch,
  } = useUpcomingMovies();
  const isLoading = nowLoading || topLoading || upcomingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([nowRefetch, topRefetch, upcomingRefetch]);
    setRefreshing(false);
  };

  return isLoading ? (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <Container>
      <>
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
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
                    <HorizontalMediaList
                      posterPath={item.poster_path ?? ""}
                      title={item.title}
                      rating={item.vote_average}
                    />
                  )}
                />
              </HView>
              <CategoryTitle>Upcoming</CategoryTitle>
            </>
          }
          data={upcomingData?.results ?? []}
          renderItem={({ item }) => <VerticalMediaCard movie={item} />}
        />
      </>
    </Container>
  );
}
