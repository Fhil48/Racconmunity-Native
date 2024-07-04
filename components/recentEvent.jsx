import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../constants'
import Loader from './Loader'
import { router } from 'expo-router'

const RecentEvent = ({ getNearEvent, isLoading, setIsLoading, data, setData, restTime, setResTime }) => {
   
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