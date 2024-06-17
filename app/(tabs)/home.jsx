import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import Trending from "../../components/Trending";
import TicketButton from "../../components/profile/TicketButton";

const events = [
  { $id: 0, title: "Eventos del dia", thumbnail: images.day_event },
  { $id: 1, title: "Eventos de la semana", thumbnail: images.weekly_event },
  { $id: 2, title: "Eventos del mes", thumbnail: images.monthly_event },
];

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 py-6">
        <View className="w-full h-16  flex flex-row  items-center ">
          <Image
            source={images.logo_png}
            resizeMode="cover"
            className="w-[250px] h-[42px]"
          />

          <View>
            <Image
              className=" ml-5 rounded-full w-[50] h-[50]"
              resizeMode="cover"
              source={images.hasbu}
            />
          </View>
        </View>
        <View>
          <Trending posts={events} />
        </View>
        <View className="">
          <TouchableOpacity className="bg-blue-500 rounded-lg p-2 flex items-center justify-between flex-row">
            <View>
              <Text className="text-white font-pmedium">Próximo evento</Text>
              <Text className="text-white font-pregular">
                22h 55m 20s faltantes
              </Text>
            </View>
            <View className="border-2 border-white rounded-lg   flex flex-row items-center py-2 px-4">
              <Text className="text-white text-sm font-pbold ">Únete</Text>
              <Image source={icons.rightArrow} className="ml-2" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View className="mt-6 space-y-2">
            <Text className="text-white text-2xl font-pbold">
              Tablón de anuncios
            </Text>
            <TicketButton title="Pet walk today" type="pets" ticket="walk" />
            <TicketButton title="water leak floor 4" type="house" />
            <TicketButton title="homemade lunch" type="food" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
