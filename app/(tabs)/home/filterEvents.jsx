import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { getAllEvents, getAllEventsMonth, getAllEventsWeek } from '../../../lib/appwrite';
import Loader from '../../../components/Loader';
import { CustomCard } from '../../../components/CustomCard';

const FilterEvents = () => {
  
  const { type } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getEvents = async (date, type) => {
    try {
      setIsLoading(true)
      if(type === 1){ // dia
        const resp = await getAllEvents(date);
        setData(resp);
      } else if(type === 2){ // semana
        const resp = await getAllEventsWeek(date);
        setData(resp);
      } else if(type === 3){ // mes
        const resp = await getAllEventsMonth(date);
        setData(resp);
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const date = new Date().toISOString();
    if(type === 'del dia'){
      getEvents(date, 1);
    } else if(type === 'de la semana'){
      getEvents(date, 2);
    } else if(type === 'del mes'){
      getEvents(date, 3);
    }
  }, [type])
  
  if(isLoading) return <SafeAreaView className="bg-primary h-full px-4 py-12 ">
  <View className="space-y-2"><Loader isLoading={isLoading}/></View></SafeAreaView>

  return (
    <SafeAreaView className="bg-primary h-full px-4 py-12 ">
      <ScrollView>
        <View className="space-y-2">
          <Text className="text-xl text-white font-psemibold text-center">Eventos {type}</Text>
          { data && data.length > 0 && data.map((event, index) => (
            <CustomCard key={index} title={event.title} image={event.thumbnail} description={event.description} onPress={()=>router.push({ pathname:'home/details', params: { id: event.$id } })}/>
          )) }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FilterEvents