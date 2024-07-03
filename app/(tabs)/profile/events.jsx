import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ReturnButton from "../../../components/profile/ReturnButton";
import TicketButton from "../../../components/profile/TicketButton";
import { router } from "expo-router";
import CreateCustomButton from '../../../components/CreateCustomButton'
import { changeStatusEvent, getAgenda, getUserEvents } from "../../../lib/appwrite";
import { CustomCard } from "../../../components/CustomCard";
import Loader from "../../../components/Loader";
import Spinner from 'react-native-loading-spinner-overlay';

const Events = () => {

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [data, setData] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [value, setValue] = useState('0');

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resp = await getUserEvents();
        setData(resp);
        console.log('mis eventos', resp);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally{
        setIsLoading(false)
      }
    }
    const fetchAgenda = async () => {
      try {
        setIsLoading(true);
        const resp = await getAgenda();
        setAgenda(resp);
        console.log('mi agenda', resp);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally{
        setIsLoading(false)
      }
    }
    fetchData()
    fetchAgenda()
  }, [])

  const handleCancelar = async (id)  => {
    try {
      setIsLoadingButton(true)
      const resp = await changeStatusEvent(id, 'canceled');
      Alert.alert('success', resp.message)
      router.replace('profile/events');
    } catch (error) {
      console.log(error.message)
    } finally{
      setIsLoadingButton(false)
    }
  }


  if(isLoading) return <SafeAreaView className="bg-primary h-full">
    <ScrollView className="px-4 my-12 ">
      <Loader isLoading={isLoading} />
    </ScrollView>
  </SafeAreaView>

  return (
    <SafeAreaView className="bg-primary h-full px-4 py-12 ">
        <Spinner
          visible={isLoadingButton}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />
        <ReturnButton
          title="Mis Eventos"
          handlePress={() => router.push("profile")}
        />
        <View className="flex-row gap-1 mt-2">
          <View className='flex-1'>
          <TouchableOpacity
          onPress={() => setValue('0')}
            activeOpacity={0.7}
            className={`rounded-xl min-h-[62px] justify-center items-center bg-black-100 border-2 border-dotted ${value === '0' ? 'border-orange-500' : '' }`}
            disabled={isLoading}
          >
              <Text className={`font-pregular text-sm text-white`}>Mis eventos</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => setValue('1')}
            activeOpacity={0.7}
            className={`rounded-xl min-h-[62px] justify-center items-center border-2 bg-black-100 border-dotted ${value === '1' ? 'border-orange-500' : '' }`}
            disabled={isLoading}
          >
              <Text className={`font-pregular text-sm text-white`}>Mi agenda</Text>
            </TouchableOpacity>
          </View>
        </View>
        { value === '0' && <View className="mb-2 space-y-2">
          <CreateCustomButton title="+" onPress={()=>router.push('profile/createEvent')} containerStyles="mt-7" textStyles="text-white"/>
        </View>}
        <ScrollView className="">
          <View className="space-y-2">
            { value === '0' && (data.length > 0 ? data.map(event => (
                  <View className="" key={event.title}>
                    <CustomCard title={event.title} image={event.thumbnail} description={event.description} onPressCancel={()=>handleCancelar(event.$id)} state={event.state} cancelar={true}/>
                  </View>
                )) : 
                <View className="">
                  <Text className="text-white text-sm">No cuentas con eventos registrados.</Text>
                </View> )
            }
            { value === '1' && (data.length > 0 ? agenda.map(event => (
              <View className="" key={event.title}>
                <CustomCard title={event.title} image={event.thumbnail} description={event.description} onPress={()=>{}}/>
              </View>
            )) : 
            <View className="">
              <Text className="text-white text-sm">No cuentas con eventos agendados.</Text>
            </View> )
        }
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default Events;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});