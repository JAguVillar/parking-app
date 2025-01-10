import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function DetalleItem({ detalle, Icono }) {
  return (
    <View className="flex-row items-center px-8 py-4">
      <View className="w-8">{Icono}</View>
      <View>
        <Text
          className="px-8 font-semibold text-lg"
          style={{ fontFamily: "Satoshi" }}
        >
          {detalle}
        </Text>
      </View>
    </View>
  );
}
