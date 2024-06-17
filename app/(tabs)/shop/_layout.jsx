import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { Stack } from "expo-router";

const ShopLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="itemShop" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ShopLayout;
