import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import React from "react";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Satoshi: require("../assets/fonts/Satoshi-Variable.ttf"), // Update the path
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1  bg-white">
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            // Hide the header for this route
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}
