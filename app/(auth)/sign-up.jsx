import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import ReturnButton from "../../components/profile/ReturnButton";
import * as DocumentPicker from "expo-document-picker";
import FormDropdown from "../../components/FormDropdown";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    rol: "user",
    thumbnail: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
    });

    if (!result.canceled) {
      setForm({ ...form, thumbnail: result.assets[0] });
    }
  };
  const submit = async () => {
    if (
      !form.email ||
      !form.password ||
      !form.username ||
      !form.thumbnail ||
      !form.rol
    ) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);
    try {
      const result = await createUser(
        form.email,
        form.password,
        form.username,
        form.rol,
        form.thumbnail,
      );
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary  h-full">
      <ScrollView>
        <View className="w-fill justify-center min-h-[85vh] px-4 my-6">
          <ReturnButton
            title="Añadir usuario"
            handlePress={() => router.push("profile/users")}
          />
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          ></FormField>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            type="password"
          />
          <FormDropdown
            title="Rol"
            otherStyles="mt-7"
            handleChangeValue={(e) => setForm({ ...form, rol: e })}
          />

          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Thumbnail Image
            </Text>
            <TouchableOpacity onPress={() => openPicker("image")}>
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
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
