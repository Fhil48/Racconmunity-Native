import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import { router } from "expo-router";

const data = [
  {
    $id: 0,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
  {
    $id: 1,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
  {
    $id: 2,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
  {
    $id: 3,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
  {
    $id: 4,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
  {
    $id: 5,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
  {
    $id: 6,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
  {
    $id: 7,
    title: "Bicicleta",
    caracteristicas: "marca y modelo",
    precio: "60000",
    descripcion: "una bicicleta",
  },
];

const ShopItem = ({ thumbnail, price, title }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`shop/itemShop`);
      }}
      className="w-1/2 h-50 border-2 p-2 border-white rounded-lg "
    >
      <Image
        className="w-full h-[120px] rounded-lg rounded-b-none"
        resizeMode="cover"
        source={thumbnail}
      />
      <Text className="text-white font-pbold text-2xl mt-2 ml-2">${price}</Text>
      <Text className="text-white font-pregular ml-2">{title}</Text>
    </TouchableOpacity>
  );
};

const shop = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 py-6">
        <Text className="text-white text-2xl font-pbold">Tienda</Text>
        <View className="flex flex-wrap flex-row">
          {data.map((item, i) => (
            <ShopItem
              thumbnail={images.bicicleta}
              price={item.precio}
              title={item.title}
              key={i}
            />
          ))}
        </View>
        <View>
          <View className="mt-6 space-y-2"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default shop;
