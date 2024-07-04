import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { getAllProducts } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import { EmptyState } from "../../../components";

const ShopItem = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "shop/item", params: { productId: item.$id } })
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

const shop = () => {
  const { data, refetch } = useAppwrite(getAllProducts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full px-4 ">
      <Text className="text-white text-2xl font-pbold my-4">Tienda</Text>
      <FlatList
        data={data}
        numColumns={2}
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

export default shop;
