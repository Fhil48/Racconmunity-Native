import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../components/profile/ReturnButton";
import { CustomButton } from "../../../components";
import { getProduct } from "../../../lib/appwrite";

const Item = () => {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState({});

  const getProducto = async () => {
    try {
      const resp = await getProduct(productId);
      console.log("product: ", resp);
      setProduct(resp);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    getProducto();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full ">
        <View className="flex flex-col h-full">
          <ReturnButton title="" handlePress={() => router.push("/shop")} />
          <View className=" -z-10 absolute w-[400px] h-[300px]">
            <Image
              source={{ uri: product.thumbnail }}
              className="h-full  w-full"
              resizeMode="cover"
            />
          </View>
          <View className="w-full py-4 mb-auto  rounded-[40px] rounded-b-none mt-32 bg-[#D9D9D9] z-10">
            <View className="mt-2 ml-4 mb-4">
              <Text className="text-2xl text-primary font-pbold">
                {product.title}
              </Text>
              <Text className="">{product.author}</Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="font-pmedium text-sm text-primary mb-4">
                {product.description}
              </Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="text-2xl text-primary mb-4 font-pbold">
                Precio: ${product.price}
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

export default Item;
