import React from "react";
import { Stack } from "expo-router";

const ShopLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="item" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ShopLayout;
