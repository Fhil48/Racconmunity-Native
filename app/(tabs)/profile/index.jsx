import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";

const ProfileButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row  items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Image source={icon} resizeMode="contain" className="w-7 h-7 mx-4" />
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      <Image
        source={icons.rightArrow}
        resizeMode="contain"
        className="w-5 h-5 mr-4 ml-auto"
      />
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full  mt-7 items-center ">
          <View className="  items-center">
            {/*<Text className="text-white text-2xl font-psemibold">Perfil</Text> */}
            <Image
              className="mt-6 rounded-full w-[150] h-[150]  "
              resizeMode="cover"
              source={images.hasbu}
            />
          </View>

          <View className="w-full justify-center mt-6 mb-12 px-4 ">
            <ProfileButton
              title="Mi perfil"
              containerStyles="mt-6"
              icon={icons.profile}
              handlePress={() => router.push("profile/my-profile")}
            />
            <ProfileButton
              title="Tickets"
              containerStyles="mt-6"
              icon={icons.wallet}
              handlePress={() => router.push("profile/tickets")}
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
          </View>
          <View className="px-2 w-full">
            <CustomButton title="Salir" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
