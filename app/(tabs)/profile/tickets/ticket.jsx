import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../../../components/profile/ReturnButton";
import { CustomButton, Loader } from "../../../../components";
import { getTicket, getCurrentUser } from "../../../../lib/appwrite";
import useAppwrite from "../../../../lib/useAppwrite";

const Ticket = () => {
  const { ticketId } = useLocalSearchParams();
  const { data: user } = useAppwrite(getCurrentUser);
  const {
    data: ticket,
    loading,
    refetch,
  } = useAppwrite(() => getTicket(ticketId));

  useEffect(() => {
    refetch();
  }, [ticketId]);

  if (loading)
    return (
      <SafeAreaView className="bg-primary h-full px-4 py-12 ">
        <View className="space-y-2">
          <Loader isLoading={loading} />
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary h-full items-center  content-center  ">
      <ReturnButton
        title=""
        handlePress={() => router.replace("/profile/tickets")}
      />
      <View className=" -z-10 absolute w-[400px] h-[300px]">
        <Image source={{ uri: ticket?.thumbnail }} className=" h-full w-full" />
      </View>

      <ScrollView className="h-full  w-full">
        <View className=" items-center flex flex-col h-full">
          <View className="mt-[12vh]  absolute bg-white rounded-xl content-center z-20">
            <Image
              source={{ uri: ticket.creator?.avatar }}
              resizeMode="cover"
              className="w-20 h-20 rounded-xl"
            />
          </View>
          <View className=" w-full py-4  rounded-[40px] rounded-b-none mt-32 pb-[100%]  bg-[#D9D9D9] ">
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
            {user?.$id === ticket?.creator?.$id ? (
              <CustomButton
                title="Cancelar"
                handlePress={() => router.replace("/profile/tickets")}
                containerStyles="mt-7 mx-8"
              />
            ) : (
              <CustomButton
                title="Unirse"
                handlePress={() => router.replace("/profile/tickets")}
                containerStyles="mt-7 mx-8"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket;
