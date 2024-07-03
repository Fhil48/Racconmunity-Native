import { Image, ActivityIndicator, Text, TouchableOpacity} from "react-native";
import Loader from "./Loader";

const CreateCustomButton = ({ title, onPress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] justify-center items-center border-2 border-dotted border-orange-500 ${containerStyles}  ${isLoading ? 'opacity-50' : '' }`}
      disabled={isLoading}
    >
      <Text className={`font-psemibold text-lg ${textStyles}`}>
        { isLoading ? <Loader isLoading={isLoading}/>: title}
      </Text>
    </TouchableOpacity>
  );
};

export default CreateCustomButton;
