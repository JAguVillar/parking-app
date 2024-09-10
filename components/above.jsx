import {
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";

export default function Above({ handleClick }) {
  function handlePress(id) {
    handleClick(id);
  }

  return (
    <View style={styles.component}>
      <View className="flex flex-row justify-between">
        <Button title="Tema original" onPress={() => handlePress(0)} />
        <Button title="Tema retro" onPress={() => handlePress(1)} />
        <Button title="Tema oscuro" onPress={() => handlePress(2)} />
        <Button title="Tema noche" onPress={() => handlePress(3)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    position: "absolute",
    bottom: 50,
  },
});
