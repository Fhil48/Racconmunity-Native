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
import { getAllProducts, getAllUserProducts } from "../../../lib/appwrite";
import { EmptyState } from "../../../components";
import useAppwrite from "../../../lib/useAppwrite";

const ShopItem = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "../shop/item",
          params: { productId: item.$id },
        })
      }
      className="w-1/2 h-50 border-2 p-2 border-white rounded-lg "
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
  );
};

const Products = () => {
  const { data, refetch } = useAppwrite(getAllUserProducts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full px-4 items-center ">
      <ReturnButton
        title="Mis Productos"
        handlePress={() => router.push("/profile")}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <ShopItem item={item} />}
        ListEmptyComponent={() => <EmptyState title="Nada para comprar aún" />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Products;
