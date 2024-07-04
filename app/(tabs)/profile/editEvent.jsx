import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReturnButton from "../../../components/profile/ReturnButton";
import { router, useLocalSearchParams } from "expo-router";
import CreateCustomButton from "../../../components/CreateCustomButton";
import FormField from "../../../components/FormField";
import CustomButton from "../../../components/CustomButton";
import { icons } from "../../../constants";
import * as DocumentPicker from "expo-document-picker";
import { DateTimeInput } from "../../../components/DateTimeInput";
import { createEvent, editEvent, getEvent } from "../../../lib/appwrite";

const EditEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const { id } = useLocalSearchParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    ubication: "",
    thumbnail: '',
    category: "event",
  });
  
  const getEvento = async () => {
    try {
      setIsLoading(true)
      const resp = await getEvent(id)
      setForm(resp);
      setTitle(resp?.title);
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getEvento();
  }, [])

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setForm((prevForm) => ({ ...prevForm, thumbnail: selectedImageUri }));
    }
  };

  const submitEdit = async () => {
    try {
      setIsLoading(true);
      console.log('mando:', form)
      await editEvent(form);
      Alert.alert("Success", 'Evento actualizado con éxito.');
      router.push("/profile");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-12 ">
        <ReturnButton
          title={title}
          handlePress={() => router.back()}
        />
        <FormField
          title="Titulo"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        ></FormField>
        <FormField
          title="Descripción"
          value={form.description}
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-10"
        ></FormField>
        <DateTimeInput initialDate={form.date} setForm={setForm} />
        <FormField
          title="Ubicación"
          value={form.ubication}
          handleChangeText={(e) => setForm({ ...form, ubication: e })}
          otherStyles="mt-10"
        ></FormField>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Imagen</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail }}
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
                  Selecciona un archivo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Editar evento"
          handlePress={submitEdit}
          containerStyles="mt-7"
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEvent;

