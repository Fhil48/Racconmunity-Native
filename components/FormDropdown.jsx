import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";

import { icons } from "../constants";

const FormDropdown = ({
  title,
  type,
  value,
  placeholder,
  handleChangeValue,
  otherStyles,
  ...props
}) => {
  const [dropdown, setDropdown] = useState("user");
  const dropdownData = [
    { id: 0, type: "user" },
    { id: 1, type: "guest" },
    { id: 2, type: "admin" },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="">
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View className="mt-40">
            <View className="bg-gray-300 p-2 mx-4 rounded-xl py-6">
              <FlatList
                data={dropdownData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="w-full bg-primary p-4  items-center rounded-xl  my-1"
                    onPress={() => {
                      setDropdown(item.type);
                      handleChangeValue(item.type);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text className="text-white text-xl">{item.type}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

        <TouchableOpacity
          className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className=" flex-1 text-white font-psemibold text-base">
            {dropdown}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FormDropdown;
