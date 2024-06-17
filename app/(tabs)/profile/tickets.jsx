import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { icons } from "../../../constants";
import ReturnButton from "../../../components/profile/ReturnButton";
import TicketButton from "../../../components/profile/TicketButton";

const Tickets = () => {
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView className="px-4 my-6 ">
        <ReturnButton
          title="Mis tickets"
          handlePress={() => router.push("/profile")}
        />
        <View className=" space-y-2">
          <TicketButton title="Paseo de mascota" type="pets" ticket="walk" />
          <TicketButton title="Capacitación hogar" type="house" />
          <TicketButton title="Almuerzo" type="food" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tickets;
