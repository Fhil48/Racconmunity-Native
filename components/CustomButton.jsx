import { Text, TouchableOpacity } from "react-native";
import Loader from "./Loader";

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : '' }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        { isLoading ? <Loader isLoading={isLoading}/>: title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
