import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";

export default function Search() {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.mainBgColor, flex: 1 }}>
      <Text>Search</Text>
    </View>
  );
}
