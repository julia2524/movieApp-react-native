import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Tabs from "./Tabs";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const isDark = useColorScheme() === "dark";
  console.log(isDark);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
