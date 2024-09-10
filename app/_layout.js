import { Stack } from "expo-router";
import { View } from "react-native";

import React from "react";

export default function Layout() {
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
