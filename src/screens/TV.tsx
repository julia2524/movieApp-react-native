import { ActivityIndicator, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { useAiringToday, usePopularTv, useTopRatedTV } from "../hooks/useTvs";
import HorizontalMediaSection from "../components/HorizontalMediaSection";
import { useState } from "react";

const Container = styled.ScrollView`
  /* background-color: ${(props) => props.theme.cardBgColor}; */
  flex: 1;
`;

export default function TV() {
  const [refreshing, setRefreshing] = useState(false);
  // const theme = useTheme();
  const {
    data: popularData,
    isLoading: popularIsLoading,
    refetch: popularRefetch,
    hasNextPage: popularHasNextPage,
    fetchNextPage: popularFetchNextPage,
  } = usePopularTv();
  const {
    data: airingData,
    isLoading: airingIsLoading,
    refetch: airingRefetch,
    hasNextPage: airingHasNextPage,
    fetchNextPage: airingFetchNextPage,
  } = useAiringToday();
  const {
    data: topData,
    isLoading: topIsLoading,
    refetch: topRefetch,
    hasNextPage: topHasNextPage,
    fetchNextPage: topFetchNextPage,
  } = useTopRatedTV();
  const popularMediaData =
    popularData?.pages.flatMap((page) => page.results) ?? [];
  const airingMediaData =
    airingData?.pages.flatMap((page) => page.results) ?? [];
  const topMediaData = topData?.pages.flatMap((page) => page.results) ?? [];
  const popularMedia =
    popularMediaData.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
      backdropPath: tv.backdrop_path ?? "",
      overview: tv.overview,
      title: tv.name,
      rating: tv.vote_average,
    })) ?? [];
  const airingMedia =
    airingMediaData.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
      backdropPath: tv.backdrop_path ?? "",
      overview: tv.overview,
      title: tv.name,
      rating: tv.vote_average,
    })) ?? [];
  const topMedia =
    topMediaData.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
      backdropPath: tv.backdrop_path ?? "",
      overview: tv.overview,
      title: tv.name,
      rating: tv.vote_average,
    })) ?? [];
  const isLoading = popularIsLoading || airingIsLoading || topIsLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([popularRefetch(), airingRefetch(), topRefetch()]);
    setRefreshing(false);
  };
  return isLoading ? (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HorizontalMediaSection
        data={airingMedia}
        title="Airing Today"
        mediaType="tv"
        hasNextPage={airingHasNextPage}
        fetchNextPage={airingFetchNextPage}
      />
      <HorizontalMediaSection
        data={popularMedia}
        title="Popular"
        mediaType="tv"
        hasNextPage={popularHasNextPage}
        fetchNextPage={popularFetchNextPage}
      />
      <HorizontalMediaSection
        data={topMedia}
        title="Top Rated"
        mediaType="tv"
        hasNextPage={topHasNextPage}
        fetchNextPage={topFetchNextPage}
      />
    </Container>
  );
}
