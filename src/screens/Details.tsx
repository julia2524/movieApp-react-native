import {
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import { useMovieDetail } from "../hooks/useMovies";
import { useTvDetail } from "../hooks/useTvs";
import { IMovieDetail } from "../types/movies";
import { ITvDetail } from "../types/tv";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";

// React Navigation이 제공하는 NativeStackScreenProps 타입을 쓰면 route 타입이 자동 완성
type DetailsRouteProps = RouteProp<RootStackParamList, "Details">;
type DetailNavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Container = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  flex: 1;
`;
const Header = styled.View`
  position: relative;
  justify-content: flex-end;
`;
const BackgroundImg = styled.Image`
  width: 100%;
  height: 100%;
`;
const ItemDetail = styled.View`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  flex-direction: row;
  /* flex-end 대신 flex-start나 center로 주면 타이틀이 포스터 위쪽 라인에 예쁘게 정렬됨 */
  align-items: center;
  padding: 20px;
`;
const Column = styled.View`
  flex: 1;
  /* flex-start로 위로 붙이기 */
  justify-content: center;
  /* 상단 여백을 살짝 주면 포스터 상단 라인과 예쁘게 떨어져 */
  padding-top: 5px;
`;
const Title = styled.Text`
  color: white;
  font-size: 25px; // 30px보다는 아담하면서 가독성 좋은 크기!
  font-weight: bold;
  line-height: 28px; // 줄바꿈이 일어났을 때 줄 간격이 답답하지 않도록 설정
`;
const Poster = styled.Image`
  width: 100px;
  height: 140px;
  border-radius: 5px;
  margin-right: 15px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  padding: 30px 20px 20px 20px; /* 포스터가 아래로 튀어나간 만큼 상단 패딩을 넉넉히 줌 */
  line-height: 22px;
`;
const CategoryTitle = styled.Text`
  padding-top: 15px;
  padding-left: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Item = styled.TouchableOpacity`
  flex-direction: row;
  gap: 5px;
  align-items: center;
  margin-bottom: 8px;
`;
const ItmeTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export default function Details() {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();
  const route = useRoute<DetailsRouteProps>();
  const navigation = useNavigation<DetailNavigationProps>();
  const { title, overview, backdropPath, posterPath, id, mediaType } =
    route.params;
  const {
    data: movieData,
    isLoading: movieLoading,
    refetch: movieRefetch,
  } = useMovieDetail(id, mediaType === "movie");
  const {
    data: tvData,
    isLoading: tvLoading,
    refetch: tvRefetch,
  } = useTvDetail(id, mediaType === "tv");

  const data = mediaType === "movie" ? movieData : tvData;
  const trailer = data?.videos.results.filter(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
  const openYouTube = async (key: string) => {
    await WebBrowser.openBrowserAsync(`https://www.youtube.com/watch?v=${key}`);
  };
  const shareMedia = async (title: string, id: number, mediaType: string) => {
    try {
      await Share.share({
        message: `이 콘텐츠 어때? 🎬\n${title}\nhttps://www.themoviedb.org/${mediaType}/${id}`,
        title,
      });
    } catch (error) {
      alert(error);
    }
  };
  const isLoading = mediaType === "movie" ? movieLoading : tvLoading;
  useEffect(() => {
    if (!isLoading) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => shareMedia(title, id, mediaType)}
            style={{ marginRight: 10 }}
          >
            <Ionicons name="share-outline" size={24} color={theme.textColor} />
          </TouchableOpacity>
        ),
      });
    }
  }, [isLoading, data]);
  return (
    <Container>
      <Header style={{ height: height / 4, width }}>
        <BackgroundImg
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          source={{ uri: makeImagePath(backdropPath) }}
        />
        <LinearGradient
          // Background Linear Gradient: 위쪽 투명, 아래로 갈수록 검정....
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={StyleSheet.absoluteFill}
        />
        <ItemDetail>
          <Poster
            source={{
              uri: makeImagePath(posterPath),
            }}
          />
          <Column>
            <Title>{title}</Title>
          </Column>
        </ItemDetail>
      </Header>
      <Overview>{overview}</Overview>
      <CategoryTitle>Trailer</CategoryTitle>
      <FlatList
        style={{ paddingLeft: 20, marginBottom: 20 }}
        keyExtractor={(item) => item.key}
        data={trailer ?? []}
        renderItem={({ item }) => (
          <Item onPress={() => openYouTube(item.key)}>
            <Ionicons name="logo-youtube" size={24} color="#FF0000" />
            <ItmeTitle style={{ textAlign: "center", lineHeight: 24 }}>
              {item.name}
            </ItmeTitle>
          </Item>
        )}
      />
    </Container>
  );
}
