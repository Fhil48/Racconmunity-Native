import { View, Text, ScrollView, SafeAreaView, Modal, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Loader from '../../../components/Loader';
import { useEffect } from 'react';
import { addEventToAgenda, getCurrentUser, getEvent, removeEventToAgenda } from '../../../lib/appwrite';
import { format } from 'date-fns';
import CustomButton from '../../../components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { icons, images } from '../../../constants';

const Details = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [data, setData] = useState({});
    const [isIn, setIsIn] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);
    const { id } = useLocalSearchParams();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getEvento = async () => {
      setIsIn(false);
      setIsCreator(false);
      setIsParticipant(false);
      try {
        setIsLoading(true)
        const resp = await getEvent(id)
        const usuario = await getCurrentUser();
        
        if(resp?.participants.includes(usuario.$id)){
          setIsIn(true)
        }
        if(resp?.users.$id == usuario.$id){
          setIsCreator(true);
        }
        if(resp?.participants.includes(usuario.$id)){
          setIsParticipant(true);
        }
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
    
    const handleCancelar = async (id)  => {
      try {
        setIsLoadingButton(true)
        if(isCreator){
          const resp = await changeStatusEvent(id, 'canceled');
          Alert.alert('success', resp.message)
        } else if(isParticipant && !isCreator){
          await removeEventToAgenda(data.$id)
          Alert.alert('Success', 'El evento se ha removido de tu agenda.')
        }
        router.replace('profile/events');
      } catch (error) {
        console.log(error.message)
      } finally{
        setIsLoadingButton(false)
      }
    }
    

    if(isLoading) return <SafeAreaView className="bg-primary h-full px-4 py-12 ">
    <View className="space-y-2"><Loader isLoading={isLoading}/></View></SafeAreaView>

  return (
    <SafeAreaView className="bg-primary h-full px-4 py-12 pb-2 flex flex-col justify-between">
      <Spinner
        visible={isLoadingButton}
        textContent={''}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView className="h-full">
        <View className="space-y-2">
          <Text className="text-xl text-white font-psemibold text-center">
            {data.title}
          </Text>
          {(isCreator && data?.state === 'active') && <Text className="bg-orange-400 text-center w-full flex flex-row gap-2 pb-2">
            <Text className="text-white mt-0 mr-2">Editar evento</Text>
            <Image 
              source={icons.edit} 
              className='w-6 h-6 mr-2 mt-0 ml-2' 
              resizeMode="contain"
            />
            </Text>}
          <Text className="text-md text-white font-psemibold text-center">Organizado por {data?.users?.username}</Text>
          <Text className="text-md text-white font-psemibold text-center">{data?.date && format(data?.date, 'dd-MM-yyyy')} {data?.date && format(data?.date, 'HH:mm')}</Text>
          <Text className="text-md text-white font-psemibold text-center">Lugar: {data?.ubication}</Text>
          <Text className="text-md text-white font-psemibold text-center">Evento: {data?.state === 'active' ? 'activo' : data?.state === 'canceled' ? 'cancelado' : 'finalizado'}</Text>
          <View className="h-[300px]">
            <Image
              source={{ uri: data?.thumbnail }}
              className="w-full h-full"
            />
          </View>         
          <Text className="text-md text-white font-psemibold text-center">{data?.description}</Text>
        </View>
      </ScrollView>
        {
          ((isCreator && !isParticipant && data?.state === 'active') || (isCreator && isParticipant && data?.state === 'active')) &&
          <View className="w-full justify-center items-center">
            <CustomButton title="Cancelar evento" handlePress={()=>setIsModalVisible(true)} containerStyles="px-4"/>
          </View>
          }
        {
          isParticipant && !isCreator && 
          <View className="w-full justify-center items-center">
            <CustomButton title="Cancelar participación" handlePress={()=>setIsModalVisible(true)} containerStyles="px-4"/>
          </View>
          }
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={()=>setIsModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              {(isCreator && data?.state === 'active') && 
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Cancelar evento {data?.title}</Text>
                  <Text style={{ textAlign: 'center' }}>El evento se removerá de la agenda de los participantes.</Text>
                  <View style={{ flexDirection: 'row', marginTop: 20, justifyContent:'space-around' }} className="w-full">
                    <CustomButton title="Confirmar" isLoading={isLoading} handlePress={() => handleCancelar(data?.$id)} containerStyles="px-4 min-h-0" textStyles="text-sm"/>
                    <TouchableOpacity style={{ padding: 10, borderRadius: 5, marginRight: 10 }} onPress={ ()=> setIsModalVisible(false)}>
                      <Text style={{ color: '#1E1E2D', fontWeight: '400' }}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              {(isParticipant && !isCreator) && 
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Cancelar participación en {data?.title}</Text>
                  <Text style={{ textAlign: 'center' }}>El evento se removerá de tu agenda.</Text>
                  <View style={{ flexDirection: 'row', marginTop: 20, justifyContent:'space-around' }} className="w-full">
                    <CustomButton title="Confirmar" isLoading={isLoading} handlePress={() => handleCancelar(data?.$id)} containerStyles="px-4 min-h-0" textStyles="text-sm"/>
                    <TouchableOpacity style={{ padding: 10, borderRadius: 5, marginRight: 10 }} onPress={ ()=> setIsModalVisible(false)}>
                      <Text style={{ color: '#1E1E2D', fontWeight: '400' }}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }

            </View>
          </Modal>  
        

    </SafeAreaView>

  )
}

export default Details

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
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});