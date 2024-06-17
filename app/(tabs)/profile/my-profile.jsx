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
      <ScrollView className="px-4 my-6">
        <ReturnButton
          title="My tickets"
          handlePress={() => router.push("/profile")}
        />

        <Text className="text-2xl text-white font-psemibold">My profile</Text>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Update profile Image
          </Text>
          <TouchableOpacity onPress={() => openPicker()}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5 mx-2"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="w-full justify-center min-h-[85vh] mt-9">
          <Text className="text-2xl text-white font-psemibold">
            Change Password
          </Text>

          <FormField
            title="current password"
            type="password"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keboardType="email-address"
          />
          <FormField
            title="new Password"
            type="password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            type="password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton title="Update profile" containerStyles="mt-7 " />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default MyProfile;
