import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ReturnButton from "../../../components/profile/ReturnButton";
import TicketButton from "../../../components/profile/TicketButton";
import { getAllTickets } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import { EmptyState, Loader } from "../../../components";

const Tickets = () => {
  const { data: tickets, loading, refetch } = useAppwrite(getAllTickets);

  useEffect(() => {
    refetch();
  }, []);

  if (loading)
    return (
      <SafeAreaView className="bg-primary h-full px-4 py-12 ">
        <View className="space-y-2">
          <Loader isLoading={loading} />
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary h-full  ">
      <View className="px-4 my-6">
        <ReturnButton
          title="Mis tickets"
          handlePress={() => router.push("/profile")}
        />
        <View className=" space-y-2">
          <FlatList
            data={tickets}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <TicketButton title={item.title} type="house" ticket={item.$id} />
            )}
            ListEmptyComponent={() => (
              <EmptyState title="Aún no has creado Tickets" />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tickets;
