import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Trending from "../../../components/Trending";
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";

import { images } from "../../../constants";
import TicketButton from "../../../components/profile/TicketButton";
import { getAllTickets, getNearestEvent } from "../../../lib/appwrite";
import RecentEvent from "../../../components/recentEvent";
import CreateButton from "../../../components/CreateButton";
import {
  differenceInMinutes,
  differenceInSeconds,
  format,
  parseISO,
} from "date-fns";
// const events = [];
const events = [
  {
    $id: 0,
    title: "Eventos del dia",
    thumbnail: images.day_event,
    type: "del dia",
  },
  {
    $id: 1,
    title: "Eventos de la semana",
    thumbnail: images.weekly_event,
    type: "de la semana",
  },
  {
    $id: 2,
    title: "Eventos del mes",
    thumbnail: images.monthly_event,
    type: "del mes",
  },
];

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [dataEvent, setDataEvent] = useState([]);
  const [restTime, setRestTime] = useState("");

  const getNearEvent = async () => {
    const currentDateTime = new Date(); // Obtener fecha y hora actual
    try {
      setIsLoadingEvent(true);

      // Obtener el evento más cercano
      const resp = await getNearestEvent();
      const dateTimeString = parseISO(resp?.date);

      // Calcular el tiempo restante hasta el evento más cercano en días, horas, minutos y segundos
      const secondsRemaining = differenceInSeconds(
        dateTimeString,
        currentDateTime,
      );
      const daysRemaining = Math.floor(secondsRemaining / (3600 * 24));
      const hoursRemaining = Math.floor(
        (secondsRemaining % (3600 * 24)) / 3600,
      );
      const minutesRemaining = Math.floor((secondsRemaining % 3600) / 60);
      const seconds = secondsRemaining % 60;

      setRestTime({
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
        seconds: seconds,
      });
      setDataEvent(resp);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingEvent(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resp = await getAllTickets();
      setData(resp);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    getNearEvent();
    setRefreshing(false);
  };

  useEffect(() => {
    getNearEvent();
    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <CreateButton />
      <ScrollView className="px-4 py-6 flex-col w-full">
        <Trending
          posts={events}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        <View className="w-full mt-6">
          <RecentEvent
            getNearEvent={getNearEvent}
            isLoading={isLoadingEvent}
            setIsLoading={setIsLoadingEvent}
            restTime={restTime}
            setRestTime={setRestTime}
            data={dataEvent}
            setData={setDataEvent}
          />
        </View>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.$id}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 70,
          }}
          contentOffset={{ x: 170 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={(item) => (
            <View className="w-full flex-col">
              <View className="my-6 w-full">
                <Text className="text-white text-2xl font-pbold">
                  Tablón de anuncios
                </Text>
                {data &&
                  data.map((item) => (
                    <TicketButton
                      key={item.title}
                      title={item.title}
                      type={item.state}
                      ticket={item.$id}
                    />
                  ))}
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
