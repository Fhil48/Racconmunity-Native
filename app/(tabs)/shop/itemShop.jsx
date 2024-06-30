import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../components/profile/ReturnButton";
import { images } from "../../../constants";
import { CustomButton } from "../../../components";

const ItemShop = () => {
  //const { item } = useLocalSearchParams();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full ">
        <View className="flex flex-col h-full">
          <ReturnButton title="" handlePress={() => router.push("/shop")} />
          <View className=" -z-10 absolute w-[400px] h-[300px]">
            <Image
              source={images.bicicleta}
              className="h-full  w-full"
              resizeMode="cover"
            />
          </View>
          <View className="w-full py-4 mb-auto  rounded-[40px] rounded-b-none mt-32 bg-[#D9D9D9] z-10">
            <View className="mt-2 ml-4 mb-4">
              <Text className="text-2xl text-primary font-pbold">
                Bicicleta
              </Text>
              <Text className="">Autor Name LastName</Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="font-pmedium text-sm text-primary mb-4">
                ¡Hola a todos! Estoy vendiendo mi bicicleta en excelentes
                condiciones. Ideal para paseos urbanos y recorridos largos,
                perfecta para quienes buscan una forma divertida y saludable de
                moverse.
              </Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="text-2xl text-primary mb-4 font-pbold">
                Descripción
              </Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="font-pmedium text-sm text-primary mb-4">
                Esta bicicleta ha sido mantenida con mucho cuidado y está lista
                para rodar. Con un diseño ligero y resistente, es perfecta para
                ciclistas de todos los niveles. Los frenos funcionan a la
                perfección y las llantas están en muy buen estado.{" "}
              </Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="text-2xl text-primary mb-4 font-pbold">
                Precio: $60.000
              </Text>
            </View>

            <CustomButton
              title="Lo quiero!"
              handlePress={() => router.push("/shop")}
              containerStyles="mt-7 mx-8"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemShop;
