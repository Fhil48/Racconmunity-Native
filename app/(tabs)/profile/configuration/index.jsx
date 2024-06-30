import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../../components/profile/ReturnButton";
import { router } from "expo-router";
import { icons } from "../../../../constants";
import ProfileButton from "../../../../components/profile/ProfileButton";

const Index = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 py-0">
        <ReturnButton
          title="Configuración"
          handlePress={() => router.push("/profile")}
        />
        <View className="w-full justify-center mt-6 mb-12 px-4 ">
          <ProfileButton
            title="Cambiar Contraseña"
            containerStyles="mt-6"
            icon={icons.profile}
            handlePress={() =>
              router.push("profile/configuration/change-password")
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
