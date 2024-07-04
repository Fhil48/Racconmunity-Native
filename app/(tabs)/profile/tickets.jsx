import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ReturnButton from "../../../components/profile/ReturnButton";
import TicketButton from "../../../components/profile/TicketButton";
import { getAllTickets } from "../../../lib/appwrite";
import { EmptyState } from "../../../components";

const Tickets = () => {
  const [tickets, setTickets] = useState({});

  const searchTickets = async () => {
    try {
      const resp = await getAllTickets();
      console.log("product: ", resp);
      setTickets(resp);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    searchTickets();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full px-4 my-6 ">
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
    </SafeAreaView>
  );
};

export default Tickets;
