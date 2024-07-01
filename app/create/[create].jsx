import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import ReturnButton from "../../components/profile/ReturnButton";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";

const Create = () => {
  const { createType } = useLocalSearchParams();
  console.log(createType);
  const { user, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: user.accountId,
    thumbnail: null,
    communities: user.community,
    price: "",
    date: "",
    location: "",
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
      !form.title ||
      !form.description ||
      !form.thumbnail ||
      (createType === "sell" && !form.price) ||
      (createType === "ticket" && !form.date) ||
      (createType === "event" && !form.location)
    ) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    //separa con if si se llama a createSell o createTicket o createEvent
    try {
      await createUser(
        form.email,
        form.password,
        form.username,
        form.rol,
        form.thumbnail,
      );

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
            title={`Crear ${createType}`}
            handlePress={() => router.push("home")}
          />
          <FormField
            title="Titulo"
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          ></FormField>
          <FormField
            title="Descripción"
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
          />

          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">Imagen</Text>
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

          {createType === "sell" && (
            <FormField
              title="Precio"
              value={form.price}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
          )}

          {createType === "ticket" && (
            <FormField
              title="Fecha"
              value={form.date}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
          )}

          {createType === "event" && (
            <FormField
              title="Evento"
              value={form.location}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
          )}
          <CustomButton
            title={`Añadir ${createType}`}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
