import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Details from "../screens/Details";
import { useTheme } from "styled-components/native";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
export default function Root() {
  const theme = useTheme();
  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            // 👇 여기에 원하는 헤더 스타일을 쏙 넣기!
            title: "", // 헤더에 뜰 타이틀 (원하면 비워도 됨)
            headerStyle: {
              backgroundColor: theme.mainBgColor, // 테마의 배경색 적용
            },
            headerTintColor: theme.textColor, // 뒤로가기 화살표나 타이틀 글자 색상
            headerShadowVisible: false, // 헤더 아래 그림자 선 없애고 싶을 때 (깔끔함!)
          }}
        />
      </Stack.Navigator>
    </>
  );
}
