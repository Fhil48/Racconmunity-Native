import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import ReturnButton from "../../../components/profile/ReturnButton";
import { router } from "expo-router";
import CreateCustomButton from '../../../components/CreateCustomButton'
import FormField from "../../../components/FormField";
import CustomButton from "../../../components/CustomButton";
import { icons } from "../../../constants";
import * as DocumentPicker from "expo-document-picker";
import { DateTimeInput } from "../../../components/DateTimeInput";
import { createEvent } from "../../../lib/appwrite";

const CreateEvent = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        ubication: "",
        thumbnail: null,
    });
    
    const openPicker = async (selectType) => {
        
        const result = await DocumentPicker.getDocumentAsync({
          type: ["image/png", "image/jpg"],
        });
    
        if (!result.canceled) {
          setForm({ ...form, thumbnail: result.assets[0] });
        }
    };

    const submit = async () => {
      try {
        setIsLoading(true);
        await createEvent(form);
        router.push('/profile')
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally{
        setIsLoading(false)
      }
    }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-12 ">
        <ReturnButton
          title="Crea un evento"
          handlePress={() => router.push("profile/events")}
        />
        <FormField
            title="Titulo"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-10"
          ></FormField>
        <FormField
            title="Descripción"
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-10"
          ></FormField>
        <DateTimeInput/>
        <FormField
            title="Ubicación"
            value={form.ubication}
            handleChangeText={(e) => setForm({ ...form, ubication: e })}
            otherStyles="mt-10"
          ></FormField>
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">
              Imagen
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
                    Selecciona un archivo
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <CustomButton
            title="Crear evento"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateEvent;