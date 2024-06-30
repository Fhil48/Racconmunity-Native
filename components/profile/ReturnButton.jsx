import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants";

const ReturnButton = ({ title, handlePress }) => {
  return (
    <>
      <View className=" items-center">
        <Text className="text-2xl mb-2 text-white font-psemibold ">
          {title}
        </Text>
      </View>
      <TouchableOpacity className="justify-start mb-7" onPress={handlePress}>
        <Image source={icons.leftArrow} className=" ml-2 " />
      </TouchableOpacity>
    </>
  );
};

export default ReturnButton;
