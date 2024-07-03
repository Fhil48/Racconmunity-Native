import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants";

const ReturnButton = ({ title, handlePress }) => {
  return (
    <>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="justify-start" onPress={handlePress}>
            <Image source={icons.leftArrow} className="" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl mb-2 text-white font-psemibold text-center">
              {title}
            </Text>
          </View>
        </View>
    </>
  );
};

export default ReturnButton;
