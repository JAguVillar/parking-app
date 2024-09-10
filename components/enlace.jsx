import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function Enlace() {
  return (
    <Link style={styles.component} href="/pagina">
      Hola
    </Link>
  );
}

const styles = StyleSheet.create({
  component: {
    position: "absolute",
    bottom: 25,
    backgroundColor: "red",
    color: "white",
  },
});
