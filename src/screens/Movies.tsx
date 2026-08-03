import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import styled, { useTheme } from "styled-components/native";
import { useNowPlaying, useTopRatedMovies } from "../hooks/useMovies";
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
const HView = styled.View`
  flex: 1;
  padding-left: 15px;
`;
const HItem = styled.View`
  margin-right: 15px;
  margin-top: 8px;
`;
const CategoryTitle = styled.Text`
  padding-top: 15px;
  padding-left: 15px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const HImage = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
const HContent = styled.View`
  flex-direction: column;
  width: 120px;

  margin-bottom: 5px;
`;
const HTitle = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
`;
const HRate = styled.Text`
  color: #a0a0a0;
  font-size: 13px;
  text-align: center;
`;
const VView = styled.View`
  padding-top: 15px;
  padding-left: 15px;
  flex-direction: row;
`;
const VImage = styled.Image`
  width: 120px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
const VContent = styled.View`
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 10px;
  justify-content: center;
  flex: 1;
`;
const VOverview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
`;
const VTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding-bottom: 5px;
`;

export default function Movies() {
  // const theme = useTheme();
  const { width, height } = useWindowDimensions();

  const { data: nowData, isLoading: nowLoading } = useNowPlaying();
  const { data, isLoading } = useTopRatedMovies();

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
                          source={{
                            uri: makeImagePath(item.poster_path ?? ""),
                          }}
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
              <CategoryTitle>Top Rated</CategoryTitle>
              <HView>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  data={data?.results ?? []}
                  renderItem={({ item }) => (
                    <HItem>
                      <HImage
                        source={{ uri: makeImagePath(item.poster_path ?? "") }}
                      />
                      <HContent>
                        <HTitle numberOfLines={1} ellipsizeMode="tail">
                          {item.title.length > 15
                            ? `${item.title.slice(0, 15)}...`
                            : item.title}
                        </HTitle>
                        <HRate>⭐️ {item.vote_average.toFixed(1)} / 10</HRate>
                      </HContent>
                    </HItem>
                  )}
                />
              </HView>
              <CategoryTitle>Upcoming</CategoryTitle>
            </>
          }
          data={data?.results ?? []}
          renderItem={({ item }) => (
            <VView>
              <VImage source={{ uri: makeImagePath(item.poster_path ?? "") }} />
              <VContent>
                <VTitle numberOfLines={1} ellipsizeMode="tail">
                  {item.title}
                </VTitle>
                <Release>{item.release_date}</Release>
                <VOverview numberOfLines={6} ellipsizeMode="tail">
                  {item.overview.length > 280
                    ? `${item.overview.slice(0, 280)}...`
                    : item.overview}
                </VOverview>
              </VContent>
            </VView>
          )}
        />
      </>
    </Container>
  );
}
