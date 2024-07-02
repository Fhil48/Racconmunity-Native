import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";
import { icons, images } from "../constants";
const CreateButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const create = [
    { id: 0, type: "event", title: "Evento" },
    { id: 1, type: "sell", title: "Vender" },
    { id: 2, type: "ticket", title: "Anuncio" },
  ];

  const pathname = usePathname();

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className=" w-full  h-full  absolute "
          onPress={() => setModalVisible(false)}
        ></TouchableOpacity>
        <View className=" h-56 px-0 ml-0 absolute py-2 bottom-24 rounded-2xl right-0 bg-black-200 z-10">
          <FlatList
            data={create}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  if (pathname.startsWith("/create"))
                    router.setParams({ createType: item.type });
                  else
                    router.push({
                      pathname: `create/${item.type}`,
                      params: { createType: item.type },
                    });
                }}
                className="flex-1 flex-row justify-end items-center my-1 mx-4"
              >
                <Text className="text-white text-xl font-psemibold  px-3">
                  {item.title}
                </Text>
                <Image source={icons.plus} />
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <View className="w-16 h-16 absolute right-0 border-2 border-red-500 bottom-2  z-10">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className=" h-full rounded-full bg-green-499 items-center justify-center opacity-100"
        >
          <Image source={icons.plus} className={`${modalVisible && "h-0"}`} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CreateButton;
