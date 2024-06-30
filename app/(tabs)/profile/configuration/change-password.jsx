import { ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../../components/profile/ReturnButton";
import { router } from "expo-router";
import { CustomButton, FormField } from "../../../../components";

const ChangePassword = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 py-0">
        <ReturnButton
          handlePress={() => router.push("/profile/configuration")}
        />
        <View className="w-full justify-center mt-6 mb-12 px-4">
          <Text className="font-pextrabold text-lg text-white">
            Cambiar contraseña
          </Text>
          <Text className="font-pregular text-white">
            La contraseña debe tener al menos 8 caracteres e incluir una
            combinación de números y letras
          </Text>
          <FormField
            placeholder="Contraseña actual"
            type="password"
            handleChangeText={(e) => setForm({ ...form, currentPassword: e })}
            otherStyles="mt-7"
          />
          <FormField
            placeholder="contraseña nueva"
            type="password"
            handleChangeText={(e) => setForm({ ...form, newPassword: e })}
          />
          <FormField
            placeholder="Repetir contraseña nueva"
            type="password"
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mb-7"
          />
          <CustomButton title="Cambiar Contraseña" containerStyles="mt-7 " />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
