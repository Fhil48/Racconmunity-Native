import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";

const FormDate = ({ handleChangeDate }) => {
  const [date, setDate] = useState("");
  console.log("fecha", typeof date);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="mt-7">
      <Modal animationType="fade" transparent visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="w-full h-full absolute bg-primary"
        ></TouchableOpacity>
        <View className="items-center m-4 mt-40 z-10">
          <DatePicker
            mode="datepicker"
            onSelectedChange={(date) => {
              setDate(date);
              console.log(typeof date);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              handleChangeDate(date);
            }}
            className="bg-secondary-200 rounded-xl min-h-[62px] w-full justify-center items-center mt-4 pt-4"
          >
            <Text className="flex-1 text-white font-psemibold text-base ">
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text className="text-base text-gray-100 font-pmedium">Fecha</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="w-full h-16 px-4 bg-black-100 rounded-2xl  justify-center border-2 border-black-200 focus:border-secondary flex flex-row items-center"
      >
        <Text className="text-white">{date}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormDate;
