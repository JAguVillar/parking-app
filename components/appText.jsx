import { Text } from "react-native";
import { useFonts } from "expo-font";

export default function AppText({ text, clase }) {
  const [loadedFont, errorFont] = useFonts({
    Satoshi: require("../assets/fonts/Satoshi-Variable.ttf"),
  });
  return (
    <Text style={{ fontFamily: "Satoshi" }} className={clase}>
      {text}
    </Text>
  );
}
