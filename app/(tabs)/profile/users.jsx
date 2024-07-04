import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../../components/index";
import { icons, images } from "../../../constants";
import ReturnButton from "../../../components/profile/ReturnButton";
import { router } from "expo-router";

const MyProfile = () => {
  return (
    <SafeAreaView className="bg-primary h-full px-4 my-6 ">
      <ReturnButton
        title="Mis tickets"
        handlePress={() => router.push("/profile")}
      />
      <View className=" space-y-2">
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TicketButton title={item.title} type="house" ticket={item.$id} />
          )}
          ListEmptyComponent={() => (
            <EmptyState title="Aún no has creado Tickets" />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default MyProfile;
