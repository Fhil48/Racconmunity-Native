import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../../components/profile/ReturnButton";
import { CustomButton } from "../../../../components";
import { getTicket } from "../../../../lib/appwrite";

const Ticket = () => {
  const { ticketId } = useLocalSearchParams();
  const [ticket, setTicket] = useState({});

  const searchTicket = async () => {
    try {
      const resp = await getTicket(ticketId);
      setTicket(resp);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    searchTicket();
  }, [ticketId]);

  console.log("ticket", ticket.creator?.avatar);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="h-full ">
        <View className="flex flex-col h-full">
          <ReturnButton
            title=""
            handlePress={() => router.push("/profile/tickets")}
          />
          <View className=" -z-10 absolute w-[400px] h-[300px]">
            <Image source={ticket?.thumbnail} className="h-40  w-full" />
          </View>
          <View className="mt-[25vh] ml-[35vw] items-center absolute z-20">
            <Image
              source={{ uri: ticket.creator?.avatar }}
              resizeMode="cover"
              className="w-20 h-20 rounded-xl"
            />
          </View>
          <View className="w-full py-4 mb-auto rounded-[40px] rounded-b-none mt-32 bg-[#D9D9D9] z-10">
            <View className="mt-20 ml-4 mb-4">
              <Text className="text-2xl text-primary  font-pbold">
                {ticket?.title}
              </Text>
              <Text className="">{ticket.creator?.username}</Text>
            </View>
            <View className="mt-2 ml-4">
              <Text className="font-pmedium text-sm text-primary mb-5">
                {ticket?.description}
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
