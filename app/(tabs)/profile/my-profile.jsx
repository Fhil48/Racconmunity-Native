import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../../components/index";
import { icons } from "../../../constants";
import ReturnButton from "../../../components/profile/ReturnButton";
import { router } from "expo-router";

const MyProfile = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
  });

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
    });

    if (!result.canceled) {
      setForm({ ...form, thumbnail: result.assets[0] });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-0">
        <ReturnButton
          title="Mi Perfil"
          handlePress={() => router.push("/profile")}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Modifica tu foto de perfil
          </Text>
          <TouchableOpacity onPress={() => openPicker()}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="fill"
                className="w-full h-[250px] rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="center"
                  className="w-5 h-5 mx-2"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Selecciona un archivo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="w-full justify-center mt-[40px]">
          <Text className="text-2xl text-white font-psemibold">
            Cambio de contraseña
          </Text>

          <FormField
            title="Contraseña actual"
            type="password"
            handleChangeText={(e) => setForm({ ...form, currentPassword: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Nueva contraseña"
            type="password"
            handleChangeText={(e) => setForm({ ...form, newPassword: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirmar nueva contraseña"
            type="password"
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
          />
          <CustomButton title="Actualizar" containerStyles="mt-7 " />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MyProfile;
