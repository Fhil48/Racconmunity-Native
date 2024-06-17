import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="my-profile" options={{ headerShown: false }} />
        <Stack.Screen name="tickets" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen
          name="tickets/[ticket]"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default ProfileLayout;
