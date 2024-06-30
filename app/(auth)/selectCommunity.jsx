import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createCommunity, selectCommunity } from "../../lib/appwrite";
import { router } from "expo-router";

const SelectCommunity = () => {

    const [value, setValue] = useState('0');
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');

    useEffect(() => { if(value === '1') setCode('') }, [value]);
    

    const handleCrearComunidad = async () => {
        try {
            setLoading(true)
            await createCommunity();
            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally{
            setLoading(false)
        }
    }
    const handleSelectCommunity = async () => {
        try {
            setLoading(true)
            await selectCommunity('DPeTXv');
            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally{
            setLoading(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 py-6">
                <View className="w-full h-16 flex flex-row items-center justify-between border-l-2 border-orange-500">
                    <Text className="text-white ml-2">Selecciona una opción</Text>
                </View>
                <View className="flex flex-column justify-between mt-5">
                    <TouchableOpacity onPress={() => setValue('1')}>
                        <View className="w-full border-2 border-orange-500 p-4 rounded-lg items-center justify-center shadow">
                            <Text className="text-white">Crear Comunidad</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setValue('2')}>
                        <View className="w-full border-2 border-orange-500 p-4 rounded-lg items-center justify-center shadow mt-2">
                            <Text className="text-white">Unirme a una Comunidad</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    value == '1' && 
                    <><View className="w-full flex flex-column items-center justify-between mt-5">
                        <Text className="text-white ml-2">Al crear una comunidad se generará un código, el cual puedes compartir con quienes quieras que sean parte de tu comunidad.</Text>
                        </View>
                        <CustomButton
                            title="Crear comunidad"
                            handlePress={handleCrearComunidad}
                            containerStyles="mt-7"
                            isLoading={loading}
                        />
                    </>
                }
                {
                    value == '2' && 
                    <><View className="w-full flex flex-column items-center justify-between mt-5">
                        <Text className="text-white ml-2">Ingresa el código de la comunidad</Text>
                        <FormField
                            title="Código"
                            // value={code}
                            // handleChangeText={(value) => setCode('DPeTXv')}
                            otherStyles="mt-10"
                        ></FormField>
                        </View>
                        <CustomButton
                            title="Unirme"
                            handlePress={handleSelectCommunity}
                            containerStyles="mt-7"
                            isLoading={loading}
                        />
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    );
  };
export default SelectCommunity