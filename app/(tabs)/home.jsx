import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Trending from "../../components/Trending";
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View, 
  ScrollView,
  Alert
} from "react-native";
import EmptyState from "../../components/EmptyState";
import { icons, images } from "../../constants";
import TicketButton from "../../components/profile/TicketButton";
import { getAllTickets } from "../../lib/appwrite";

// const events = [];
const events = [
  { $id: 0, title: "Eventos del dia", thumbnail: images.day_event },
  { $id: 1, title: "Eventos de la semana", thumbnail: images.weekly_event },
  { $id: 2, title: "Eventos del mes", thumbnail: images.monthly_event },
];

const Home = () => {
  
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resp = await getAllTickets();
        setData(resp);
        console.log(resp);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally{
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  


  return (
    <SafeAreaView className="bg-primary h-full w-full">
    
    <ScrollView className="px-4 py-6 flex-col w-full">    
      <Trending posts={events} refreshing={refreshing} onRefresh={onRefresh}/>
      <View className="w-full mt-6">
          <TouchableOpacity className="bg-blue-500 rounded-lg p-2 flex items-center justify-between flex-row">
            <View>
              <Text className="text-white font-pmedium">Próximo evento</Text>
              <Text className="text-white font-pregular">22h 55m 20s faltantes</Text>
            </View>
            <View className="border-2 border-white rounded-lg flex flex-row items-center py-2 px-4">
              <Text className="text-white text-sm font-pbold">Únete</Text>
              <Image source={icons.rightArrow} className="ml-2" />
            </View>
          </TouchableOpacity>
        </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.$id}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={(item) => (
          <View className="w-full flex-col">
            <View className="my-6 w-full">
              <Text className="text-white text-2xl font-pbold">Tablón de anuncios</Text>
              { data && data.map(item => (
                <TicketButton key={item.title} title={item.title} type="pets" ticket="walk" />
              )) }
            </View>
          </View>
        )}
      />
      </ScrollView>
  </SafeAreaView>
  
  );
};

export default Home;
