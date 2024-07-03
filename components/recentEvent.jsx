import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../constants'
import Loader from './Loader'
import { getNearestEvent } from '../lib/appwrite'
import { differenceInMinutes, differenceInSeconds, format, parseISO } from 'date-fns'
import { router } from 'expo-router'

const RecentEvent = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [restTime, setRestTime] = useState('');

    const getNearEvent = async () => {
        const currentDateTime = new Date(); // Obtener fecha y hora actual
        try {
            setIsLoading(true);
    
            // Obtener el evento más cercano
            const resp = await getNearestEvent();
            const dateTimeString = parseISO(resp?.date);
    
            // Calcular el tiempo restante hasta el evento más cercano en días, horas, minutos y segundos
            const secondsRemaining = differenceInSeconds(dateTimeString, currentDateTime);
            const daysRemaining = Math.floor(secondsRemaining / (3600 * 24));
            const hoursRemaining = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
            const minutesRemaining = Math.floor((secondsRemaining % 3600) / 60);
            const seconds = secondsRemaining % 60;
    
            setRestTime({
                days: daysRemaining,
                hours: hoursRemaining,
                minutes: minutesRemaining,
                seconds: seconds
            });
            setData(resp);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getNearEvent()
    }, [])
    

    if(isLoading) return <SafeAreaView className="bg-primary h-full px-4 py-12 ">
  <View className="space-y-2"><Loader isLoading={isLoading}/></View></SafeAreaView>

  return (
    <TouchableOpacity className="bg-blue-500 rounded-lg p-2 flex items-center justify-between flex-row" onPress={()=> router.push({ pathname:'home/details', params: { id: data.$id } })}>
        <View>
            <Text className="text-white font-pmedium">Próximo evento</Text>
            <Text className="text-white font-pmedium">{data.title}</Text>
            <Text className="text-white font-pregular">{restTime && `${restTime.days} dias, ${restTime.hours} horas, ${restTime.minutes} minutos`}</Text>
        </View>
        <View className="border-2 border-white rounded-lg flex flex-row items-center py-2 px-4">
            <Text className="text-white text-sm font-pbold">Únete</Text>
            <Image source={icons.rightArrow} className="ml-2" />
        </View>
    </TouchableOpacity>
  )
}

export default RecentEvent