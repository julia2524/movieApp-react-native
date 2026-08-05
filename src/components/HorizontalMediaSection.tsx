import { FlatList } from "react-native";
import styled from "styled-components/native";
import { ITv } from "../types/tv";
import HorizontalMediaList from "./HorizontalMediaList";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

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
interface IMediaItem {
  id: number;
  posterPath: string;
  title: string;
  rating: number;
  backdropPath: string;
  overview: string;
}

interface HorizontalSectionProps {
  data: IMediaItem[];
  title: string;
  mediaType: "movie" | "tv";
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<any, unknown>>;
}
export default function HorizontalMediaSection({
  data,
  title,
  mediaType,
  hasNextPage,
  fetchNextPage,
}: HorizontalSectionProps) {
  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };
  return (
    <>
      <CategoryTitle>{title}</CategoryTitle>
      <HView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          data={data}
          renderItem={({ item }) => (
            <HorizontalMediaList
              id={item.id}
              backdropPath={item.backdropPath}
              posterPath={item.posterPath}
              title={item.title}
              rating={item.rating}
              overview={item.overview}
              mediaType={mediaType}
            />
          )}
        />
      </HView>
    </>
  );
}
