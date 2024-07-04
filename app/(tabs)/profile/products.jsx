import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ReturnButton from "../../../components/profile/ReturnButton";
import { EmptyState, Loader } from "../../../components";
import useAppwrite from "../../../lib/useAppwrite";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { getAllUserProducts } from "../../../lib/appwrite";

const ShopItem = ({ item }) => {
  console.log("item: ", item);
  return (
    <View className="h-full  mx-10">
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "../shop/item",
            params: { productId: item.$id },
          })
        }
        className="w-full h-50 border-2 p-2 border-white rounded-lg "
      >
        <Image
          className="w-full h-[120px] rounded-lg rounded-b-none"
          resizeMode="cover"
          source={{ uri: item.thumbnail }}
        />
        <Text className="text-white font-pbold text-2xl mt-2 ml-2">
          ${item.price}
        </Text>
        <Text className="text-white font-pregular ml-2">{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Products = () => {
  const { user } = useGlobalContext();
  const {
    data: products,
    refetch,
    loading,
  } = useAppwrite(() => getAllUserProducts(user.$id));
  const [refreshing, setRefreshing] = useState(false);
  console.log("productos ", products);

  useEffect(() => {
    refetch();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
    <SafeAreaView className="bg-primary h-full  px-4 content-center ">
      <ReturnButton
        title="Mis Productos"
        handlePress={() => router.push("/profile")}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <ShopItem item={item} />}
        ListEmptyComponent={() => (
          <EmptyState title="Aún no has vendido nada" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Products;
