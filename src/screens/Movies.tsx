import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
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
import HorizontalMediaSection from "../components/HorizontalMediaSection";

const Container = styled.View`
  /* background-color: ${(props) => props.theme.cardBgColor}; */
  flex: 1;
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
    hasNextPage: topHasNextPage,
    fetchNextPage: topFetchNextPage,
  } = useTopRatedMovies();
  const topMediaData = topData?.pages.flatMap((page) => page.results) ?? [];
  const topMedia = topMediaData.map((movie) => ({
    id: movie.id,
    posterPath: movie.poster_path ?? "",
    backdropPath: movie.backdrop_path ?? "",
    overview: movie.overview,
    title: movie.title,
    rating: movie.vote_average,
  }));
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    hasNextPage: upcomingHasNextPage,
    fetchNextPage: upcomingFecthNextPage,
    refetch: upcomingRefetch,
  } = useUpcomingMovies();
  const isLoading = nowLoading || topLoading || upcomingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([nowRefetch(), topRefetch(), upcomingRefetch()]);
    setRefreshing(false);
  };

  const upcomingLoad = () => {
    if (upcomingHasNextPage) upcomingFecthNextPage();
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
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={
            <>
              <Carousel
                loop
                autoplay
                style={{ width, height: height / 4 }}
                data={nowData?.results ?? []}
                renderItem={({ item }) => <MovieCarousel movie={item} />}
              />
              <HorizontalMediaSection
                data={topMedia}
                title="Top Rated"
                mediaType="movie"
                hasNextPage={topHasNextPage}
                fetchNextPage={topFetchNextPage}
              />
              <CategoryTitle>Upcoming</CategoryTitle>
            </>
          }
          data={upcomingData?.pages.flatMap((page) => page.results)}
          onEndReached={upcomingLoad}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => <VerticalMediaCard movie={item} />}
        />
      </>
    </Container>
  );
}
