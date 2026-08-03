import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";

export default function TV() {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.mainBgColor, flex: 1 }}>
      <Text>TV</Text>
    </View>
  );
}
