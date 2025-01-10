import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import AppText from "./appText";

export default function Marker() {
  return (
    <View className="py-1 px-2 bg-white rounded-full border-solid border-2 border-slate-300">
      <Text style={{ fontFamily: "Satoshi" }} clase="font-bold">
        $500 / hr
      </Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   texto: {
//     fontWeight: "bold",
//   },
// });
