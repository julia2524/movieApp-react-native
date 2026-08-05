import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import TV from "../screens/TV";
import Search from "../screens/Search";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "styled-components/native";
import { Pressable } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        sceneStyle: { backgroundColor: theme.mainBgColor },
        tabBarButton: (props) => (
          <Pressable
            {...(props as any)}
            android_ripple={{ color: "transparent" }}
          />
        ),
        tabBarStyle: {
          backgroundColor: theme.mainBgColor,
          paddingTop: 5,
          height: 70,
        },
        tabBarActiveTintColor: theme.accentColor,
        tabBarInactiveTintColor: theme.textColor,
        headerStyle: { backgroundColor: theme.mainBgColor },
        headerTintColor: theme.textColor,
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
