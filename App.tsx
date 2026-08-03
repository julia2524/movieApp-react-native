import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import Tabs from "./Tabs";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Provide the client to your App
export default function App() {
  const isDark = useColorScheme() === "dark";
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
