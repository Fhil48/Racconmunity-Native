// EN ESTA CARPETA VAN LAS VISTAS QUE TENGAN RELACIÓN CON LA AUTENTICACIÓN, LOGIN, REGISTRO, SETPASS, RESETPASS
import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up-auth" options={{ headerShown: false }} />
        <Stack.Screen name="selectCommunity" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default AuthLayout;

