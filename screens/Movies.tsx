import { StatusBar } from "expo-status-bar";
import { Text, useWindowDimensions, View } from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import styled, { useTheme } from "styled-components/native";

const Container = styled.View`
  /* background-color: ${(props) => props.theme.mainBgColor}; */
  flex: 1;
`;

const data = ["First", "Second", "Third"];
export default function Movies() {
  // const theme = useTheme();
  const { width, height } = useWindowDimensions();

  return (
    <Container>
      <Carousel
        loop
        autoplay
        style={{ width, height: height / 4 }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>{item}</Text>
          </View>
        )}
      />
    </Container>
  );
}
