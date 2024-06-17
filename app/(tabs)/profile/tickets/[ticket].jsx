import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../../components/profile/ReturnButton";
import { images } from "../../../../constants";
import { CustomButton } from "../../../../components";

const Ticket = () => {
  const data = {
    title: "title",
    description: "description",
    background: "bg-red",
  };
  const { ticket } = useLocalSearchParams();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full ">
        <View className="flex flex-col h-full">
          <ReturnButton
            title=""
            handlePress={() => router.push("/profile/tickets")}
          />
          <View className=" -z-10 absolute w-[400px] h-[300px]">
            <Image source={images.empty} className="h-40  w-full" />
          </View>
          <View className="  mt-[25vh] ml-[35vw] items-center absolute z-20">
            <Image
              source={images.profile}
              resizeMode="cover"
              className="w-20 h-20 rounded-xl"
            />
          </View>
          <View className="w-full h-[500px] mb-auto rounded-[40px] mt-32 bg-[#D9D9D9] z-10">
            <View className="mt-20 ml-4">
              <Text className="font-pmedium text-2xl text-primary mb-4">
                Title
              </Text>
              <Text>Paseo de Perros en el Parque Central</Text>
            </View>
            <View className="mt-10 ml-4">
              <Text className="font-pmedium text-2xl text-primary mb-4">
                Description
              </Text>
              <Text>
                ¡Dale a tu perro la atención y el ejercicio que necesita con
                nuestros paseos diarios en el hermoso Parque Central! Nuestros
                paseadores de perros experimentados y apasionados se asegurarán
                de que tu mascota disfrute de un paseo divertido y seguro. Este
                servicio es perfecto para dueños de mascotas ocupados que
                quieren garantizar que su perro se mantenga activo y feliz.
              </Text>
            </View>
            <CustomButton title="Cancel" containerStyles="mt-7 mx-8" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket;

const styles = StyleSheet.create({});
