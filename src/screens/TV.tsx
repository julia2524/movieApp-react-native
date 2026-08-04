import { ActivityIndicator, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { useAiringToday, usePopularTv, useTopRatedTV } from "../hooks/useTvs";
import HorizontalMediaSection from "../components/HorizontalMediaSection";
import { useState } from "react";

const Container = styled.ScrollView`
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
const HView = styled.View`
  flex: 1;
  padding-left: 15px;
`;

export default function TV() {
  const [refreshing, setRefreshing] = useState(false);
  // const theme = useTheme();
  const {
    data: popularData,
    isLoading: popularIsLoading,
    refetch: popularRefetch,
  } = usePopularTv();
  const {
    data: airingData,
    isLoading: airingIsLoading,
    refetch: airingRefetch,
  } = useAiringToday();
  const {
    data: topData,
    isLoading: topIsLoading,
    refetch: topRefetch,
  } = useTopRatedTV();

  const popularMedia =
    popularData?.results.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
      title: tv.name,
      rating: tv.vote_average,
    })) ?? [];
  const airingMedia =
    airingData?.results.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
      title: tv.name,
      rating: tv.vote_average,
    })) ?? [];
  const topMedia =
    topData?.results.map((tv) => ({
      id: tv.id,
      posterPath: tv.poster_path ?? "",
      title: tv.name,
      rating: tv.vote_average,
    })) ?? [];
  const isLoading = popularIsLoading || airingIsLoading || topIsLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([popularRefetch, airingRefetch, topRefetch]);
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
      <HorizontalMediaSection data={airingMedia} title="Airing Today" />
      <HorizontalMediaSection data={popularMedia} title="Popular" />
      <HorizontalMediaSection data={topMedia} title="Top Rated" />
    </Container>
  );
}
