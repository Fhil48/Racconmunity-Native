import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../components/profile/ReturnButton";
import { CustomButton } from "../../../components";

const ItemShop = () => {
  const { product } = useLocalSearchParams();
  console.log("producto: ", product);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full ">
        <View className="flex flex-col h-full">
          <ReturnButton title="" handlePress={() => router.push("/shop")} />
          <View className=" -z-10 absolute w-[400px] h-[300px]">
            <Image
              source={{ uri: thumbnail }}
              className="h-full  w-full"
              resizeMode="cover"
            />
          </View>
          <View className="w-full py-4 mb-auto  rounded-[40px] rounded-b-none mt-32 bg-[#D9D9D9] z-10">
            <View className="mt-2 ml-4 mb-4">
              <Text className="text-2xl text-primary font-pbold">{title}</Text>
              <Text className="">{author}</Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="font-pmedium text-sm text-primary mb-4">
                {description}
              </Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="text-2xl text-primary mb-4 font-pbold">
                Precio: ${price}
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
