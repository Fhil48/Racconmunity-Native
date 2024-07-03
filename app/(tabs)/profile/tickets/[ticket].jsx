import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../../components/profile/ReturnButton";
import { CustomButton } from "../../../../components";

const Ticket = () => {
  const { ticket } = useLocalSearchParams();
  console.log(ticket);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full ">
        <View className="flex flex-col h-full">
          <ReturnButton
            title=""
            handlePress={() => router.push("/profile/tickets")}
          />
          <View className=" -z-10 absolute w-[400px] h-[300px]">
            <Image source={ticket.thumbnail} className="h-40  w-full" />
          </View>
          <View className="mt-[25vh] ml-[35vw] items-center absolute z-20">
            <Image
              source={ticket.user.avatar}
              resizeMode="cover"
              className="w-20 h-20 rounded-xl"
            />
          </View>
          <View className="w-full py-4 mb-auto rounded-[40px] rounded-b-none mt-32 bg-[#D9D9D9] z-10">
            <View className="mt-20 ml-4 mb-4">
              <Text className="text-2xl text-primary  font-pbold">
                {ticket.title}
              </Text>
              <Text className="">{ticket.author.username}</Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="font-pmedium text-sm text-primary mb-4">
                {ticket.description}
              </Text>
            </View>
            <CustomButton
              title="Cancelar"
              handlePress={() => router.push("/profile/tickets")}
              containerStyles="mt-7 mx-8"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket;
