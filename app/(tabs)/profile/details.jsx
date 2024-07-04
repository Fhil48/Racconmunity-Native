import { View, Text, ScrollView, SafeAreaView, Modal, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import Loader from '../../../components/Loader';
import { useEffect } from 'react';
import { addEventToAgenda, changeStatusEvent, getCurrentUser, getEvent, removeEventToAgenda } from '../../../lib/appwrite';
import { format } from 'date-fns';
import CustomButton from '../../../components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { icons, images } from '../../../constants';
import ReturnButton from '../../../components/profile/ReturnButton';

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
          console.log('cancelando..');
          const resp = await changeStatusEvent(id, 'canceled');
          Alert.alert('Listo', resp.message)
        } else if(isParticipant && !isCreator){
          await removeEventToAgenda(data.$id)
          Alert.alert('Listo', 'El evento se ha removido de tu agenda.')
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
    <SafeAreaView className="bg-primary h-full pb-2 flex flex-col justify-between">
      <Spinner
        visible={isLoadingButton}
        textContent={''}
        textStyle={styles.spinnerTextStyle}
      />
      <ScrollView className="h-full">
        <View className="h-[300px] w-full relative">
          <ReturnButton
            title=""
            classes="absolute top-10 left-5 z-20"
            handlePress={() => router.back()}
          />
          <View className="bg-purple-700 px-2 py-2 rounded-sm absolute top-20 right-0 z-50">
              <Text className="text-md text-white font-pregular text-center mb-0 pb-0">{data?.date && format(data?.date, 'MMM')}</Text>
              <Text className="text-md text-white font-psemibold text-center">{data?.date && format(data?.date, 'dd')} </Text>
          </View>
            <Image
              source={{ uri: data?.thumbnail }}
              className="w-full h-full"
            />
            {(isCreator && data?.state === 'active') &&
            <Text className="bg-orange-400 text-center w-full flex flex-row pb-2 absolute bottom-0" onPress={()=> router.push({ pathname: "profile/editEvent", params: {'id': data?.$id} })}>
              <Text className="text-white mt-0 ">Editar evento</Text>
              <Image 
                source={icons.edit} 
                className='w-6 h-6 mr-2 mt-0 ml-2'
                resizeMode="contain"
              />
              </Text>
          }
          </View>

        <View className="space-y-2 px-4 mt-4">
          <Text className="text-xl text-white font-psemibold">
            {data.title}
          </Text>
          
          <View className="flex-row justify-between">
            <View className="text-md text-white font-pregular flex-row items-center gap-2">
              <Image source={images.profile} className="w-[30] h-[30] rounded-sm" />
              <Text className="text-gray-300 font-plight">Organizado por</Text>
              <Text className="text-white font-pregular">{data?.users?.username}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <Image source={icons.calendar} className="w-[30] h-[30] rounded-sm" />
            <Text className="text-md text-white font-pregular mb-0 pb-0">{data?.date && format(data?.date, 'dd MMM, yyyy')} a las {data?.date && format(data?.date, 'HH:mm')}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Image source={icons.pin} className="w-[30] h-[30] rounded-sm" />
            <Text className="text-md text-white font-pregular">{data?.ubication}</Text>
          </View>
          <View className="flex-row items-center gap-2 mb-2">
            <Image source={icons.profile} className="w-[30] h-[30] rounded-sm" />
            <View className="flex-row items-center">
              <Text className="text-md text-orange-400 font-pregular">{data?.participants && data?.participants.length} 
              <Text className="text-white"> Participantes</Text></Text>
            </View>
          </View>

          <Text className={`text-md text-white font-psemibold text-center w-full pt-1 ${data?.state === 'active' ? 'bg-green-600' : data?.state === 'bg-gray-800' ? 'cancelado' : 'bg-red-800'}`}>
            <Text className="font-pregular">Evento</Text> {data?.state === 'active' ? 'activo' : data?.state === 'canceled' ? 'cancelado' : 'finalizado'}
          </Text>
          <Text className="text-md text-white font-psemibold">Descripción</Text>
          <Text className="text-md text-white font-pregular text-justify">{data.description}</Text>
        </View>
      </ScrollView>
        
      {
          ((isCreator && !isParticipant && data?.state === 'active') || (isCreator && isParticipant && data?.state === 'active')) &&
          <View className="w-full justify-between p-2 bg-black-100">
            <Text className="text-md text-white font-psemibold">Opciones</Text>
            <View className="w-full justify-between items-center flex-row gap-1">
              <Text className="text-sm text-white font-pregular flex-1">Puedes cancelar el evento.</Text>
              <CustomButton title="Cancelar evento" handlePress={()=>setIsModalVisible(true)} containerStyles="min-h-[40px] px-4 py-2 rounded-sm bg-gray-600"  textStyles="text-sm text-gray-200"/>
            </View>
          </View>
      }

        {
          isParticipant && !isCreator && 
          <View className="w-full justify-between p-2 bg-black-100">
            <Text className="text-md text-white font-psemibold">Opciones</Text>
            <View className="w-full justify-between items-center flex-row gap-1">
              <Text className="text-sm text-white font-pregular flex-1">Puedes cancelar tu participación.</Text>
              <CustomButton title="Cancelar participación" handlePress={()=>setIsModalVisible(true)} containerStyles="min-h-[40px] px-4 py-2 rounded-sm bg-gray-600"  textStyles="text-sm text-gray-200"/>
            </View>
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
                    <CustomButton title="Confirmar" isLoading={isLoading} handlePress={() => handleCancelar(data?.$id)} containerStyles="px-4 min-h-0 bg-gray-800 rounded-sm" textStyles="text-sm text-gray-300"/>
                    <TouchableOpacity style={{ padding: 10, borderRadius: 5, marginRight: 10 }} onPress={ ()=> setIsModalVisible(false)}>
                      <Text style={{ color: '#1E1E2D', fontWeight: '400' }}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
              {(isParticipant && !isCreator) && 
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Cancelar participación en {data?.title}</Text>
                  <Text style={{ textAlign: 'center' }}>El evento se removerá de tu agenda.</Text>
                  <View style={{ flexDirection: 'row', marginTop: 20, justifyContent:'space-around' }} className="w-full">
                    <CustomButton title="Confirmar" isLoading={isLoading} handlePress={() => handleCancelar(data?.$id)} containerStyles="px-4 min-h-0 bg-gray-800 rounded-sm" textStyles="text-sm text-gray-300"/>
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