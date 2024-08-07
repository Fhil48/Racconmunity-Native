import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import ProfileButton from "../../../components/profile/ProfileButton";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { signOut } from "../../../lib/appwrite";

const Profile = () => {
  const { user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false)

  const salir = async () => {
    try {
      setIsLoading(true)
      await signOut();
      router.replace('/'); 
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full mt-7 items-center">
          <View className="flex-row items-start gap-2 px-4">
            <Image
              className="rounded-lg w-[120px] h-[120px]"
              resizeMode="cover"
              source={images.hasbu}
            />
            {/*<View>
              <Text className="text-white text-sm font-psemibold">Hasbula Nurmagomedov</Text> 
            </View> */}
          </View>

          <View className="w-full justify-center mt-6 mb-12 px-4 ">
            <ProfileButton
              title="Usuarios"
              containerStyles="mt-6"
              icon={icons.profile}
              handlePress={() => router.push("profile/users")}
            />
            <ProfileButton
              title="Tickets"
              containerStyles="mt-6"
              icon={icons.wallet}
              handlePress={() => router.push("profile/tickets")}
            />
            <ProfileButton
              title="Eventos"
              containerStyles="mt-6"
              icon={icons.bookmark}
              handlePress={() => router.push("profile/events")}
            />
            <ProfileButton
              title="Productos"
              containerStyles="mt-6"
              icon={icons.bag}
              handlePress={() => router.push("profile/products")}
            />
            <ProfileButton
              title="Notificaciones"
              containerStyles="mt-6"
              icon={icons.notification}
              handlePress={() => router.push("profile/notifications")}
            />
            <ProfileButton
              title="Configuración"
              containerStyles="mt-6"
              icon={icons.settings}
              handlePress={() => router.push("profile/configuration")}
            />
          </View>
          <View className="px-2 w-full">
            <CustomButton title="Salir" handlePress={salir} isLoading={isLoading}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
