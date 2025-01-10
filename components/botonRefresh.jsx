import React from "react";
import { StyleSheet, View, ActivityIndicator, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function BotonRefresh({ refresh, loading }) {
  console.log("Child loading prop:", loading);
  return (
    <View style={styles.component}>
      <Pressable
        onPress={() => {
          if (!loading) {
            refresh(); // Trigger fetch if not already loading
          }
        }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <FontAwesome name="refresh" size={28} color="black" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    position: "absolute",
    top: 50,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 56,
    width: 56,
    borderColor: "slategray",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
