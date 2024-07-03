import { View, Text, ScrollView, SafeAreaView, Image, Modal, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Loader from '../../../components/Loader';
import { useEffect } from 'react';
import { addEventToAgenda, getEvent } from '../../../lib/appwrite';
import { format } from 'date-fns';
import CustomButton from '../../../components/CustomButton';

const Details = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const { id } = useLocalSearchParams();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleConfirmAsistencia = () => {
      setIsModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
    };

    const getEvento = async () => {
      try {
        setIsLoading(true)
        const resp = await getEvent(id)
        console.log('evento: ', resp)
        setData(resp);
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      getEvento();
    }, [])
    
    const handleConfirmar = async () =>{
      try {
        setIsLoading(true)
        await addEventToAgenda(data.$id)
        Alert.alert('Success', 'Revisa tu perfil, el evento ha sido añadido a tu agenda.')
        router.push('/home');
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if(isLoading) return <SafeAreaView className="bg-primary h-full px-4 py-12 ">
    <View className="space-y-2"><Loader isLoading={isLoading}/></View></SafeAreaView>

  return (
    <SafeAreaView className="bg-primary h-full px-4 py-12 pb-2 flex flex-col justify-between">
      <ScrollView className="h-full">
        <View className="space-y-2">
          <Text className="text-xl text-white font-psemibold text-center">{data?.title}</Text>
          <Text className="text-md text-white font-psemibold text-center">Organizado por {data?.users?.username}</Text>
          <Text className="text-md text-white font-psemibold text-center">{data?.date && format(data?.date, 'dd-MM-yyyy')} {data?.date && format(data?.date, 'HH:mm')}</Text>
          <Text className="text-md text-white font-psemibold text-center">Lugar: {data?.ubication}</Text>
          <View className="h-[300px]">
            <Image
              source={{ uri: data?.thumbnail }}
              className="w-full h-full"
            />
          </View>         
          <Text className="text-md text-white font-psemibold text-center">{data?.description}</Text>
        </View>
      </ScrollView>
      <View className="w-full justify-center items-center">
        <CustomButton title="Participar" handlePress={handleConfirmAsistencia} containerStyles="px-4"/>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Confirma tu asistencia</Text>
            <Text style={{ textAlign: 'center' }}>El evento se agregará a tu agenda</Text>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent:'space-around' }} className="w-full">
              <CustomButton title="Confirmar" isLoading={isLoading} handlePress={handleConfirmar} containerStyles="px-4 min-h-0" textStyles="text-sm"/>
              <TouchableOpacity style={{ padding: 10, borderRadius: 5, marginRight: 10 }} onPress={handleCloseModal}>
                <Text style={{ color: '#1E1E2D', fontWeight: '400' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>

  )
}

export default Details