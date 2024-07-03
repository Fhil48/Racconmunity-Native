import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../../components/profile/ReturnButton";
import { images } from "../../../../constants";
import { CustomButton } from "../../../../components";

const Ticket = () => {
  const { ticket } = useLocalSearchParams();
  console.log(ticket);

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
          <View className="mt-[25vh] ml-[35vw] items-center absolute z-20">
            <Image
              source={images.profile}
              resizeMode="cover"
              className="w-20 h-20 rounded-xl"
            />
          </View>
          <View className="w-full py-4 mb-auto rounded-[40px] rounded-b-none mt-32 bg-[#D9D9D9] z-10">
            <View className="mt-20 ml-4 mb-4">
              <Text className="text-2xl text-primary  font-pbold">
                Paseo de perros en el Parque Central
              </Text>
              <Text className="">Autor Name LastName</Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="font-pmedium text-sm text-primary mb-4">
                ¡Hola, vecinos! ¿Necesitan ayuda para que sus adorables mascotas
                se mantengan activas y felices? Estoy ofreciendo un servicio de
                paseo de mascotas para asegurarme de que sus compañeros peludos
                reciban el ejercicio y el cuidado que necesitan. Ofrezco paseos
                diarios de 30 minutos a una hora, según las necesidades de su
                mascota, con atención personalizada, cuidado y seguridad. Al
                final de cada paseo, recibirán un pequeño informe con fotos y
                detalles sobre cómo fue el paseo. Amo a los animales y disfruto
                pasar tiempo con ellos, soy confiable y responsable, y ofrezco
                horarios flexibles para adaptarme a sus necesidades. Si están
                interesados en darle a su mascota un paseo divertido y
                saludable, no duden en contactarme. Estoy aquí para ayudar a que
                sus amigos de cuatro patas vivan felices y activos. ¡Espero
                conocer a sus maravillosas mascotas pronto!
              </Text>
            </View>
            <CustomButton
              title="Cancelar"
              handlePress={() => router.push("/profile/tickets")}
              containerStyles="mt-7 mx-8"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket;

const styles = StyleSheet.create({});
