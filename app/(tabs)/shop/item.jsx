import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../components/profile/ReturnButton";
import { CustomButton, Loader } from "../../../components";
import { changeStatusProduct, getProduct } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import { useGlobalContext } from "../../../context/GlobalProvider";

const Item = () => {
  const { user } = useGlobalContext();
  const { productId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    data: product,
    refetch,
    loading,
  } = useAppwrite(() => getProduct(productId));

  useEffect(() => {
    refetch();
  }, [productId]);

  const handleCancelar = async (id) => {
    try {
      const resp = await changeStatusProduct(id, "canceled");
      Alert.alert("success", resp.message);
      router.replace("profile/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <SafeAreaView className="bg-primary h-full px-4 py-12 ">
        <View className="space-y-2">
          <Loader isLoading={loading} />
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className=" ">
        <View className="flex flex-col h-full items-center ">
          <ReturnButton title="" handlePress={() => router.push("/shop")} />
          <View className=" -z-10 absolute w-[400px] h-[300px]">
            <Image
              source={{ uri: product.thumbnail }}
              className="h-full  w-full"
              resizeMode="cover"
            />
          </View>
          <View className="w-full py-4 h-full mb-[100%] rounded-[40px] rounded-b-none mt-32 bg-[#D9D9D9] z-10">
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
            {user.$id === product.seller?.$id ? (
              <CustomButton
                title="Cancelar"
                handlePress={() => setIsModalVisible(true)}
                containerStyles="mt-7 mx-8 bg-red-500"
              />
            ) : (
              <CustomButton
                title="Lo quiero!"
                handlePress={() => router.push("/shop")}
                containerStyles="mt-7 mx-8"
              />
            )}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
            >
              Cancelar producto {product?.title}
            </Text>
            <Text style={{ textAlign: "center" }}>
              El producto se removerá de los participantes que lo querian.
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-around",
              }}
              className="w-full"
            >
              <CustomButton
                title="Confirmar"
                isLoading={isLoading}
                handlePress={() => handleCancelar(product.$id)}
                containerStyles="px-4 min-h-0"
                textStyles="text-sm"
              />
              <TouchableOpacity
                style={{ padding: 10, borderRadius: 5, marginRight: 10 }}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={{ color: "#1E1E2D", fontWeight: "400" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Item;
