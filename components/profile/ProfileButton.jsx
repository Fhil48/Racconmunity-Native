import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
import { icons } from "../../constants";

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
      className={`rounded-xl border-secondary-200 border-[1px] min-h-[62px] flex flex-row align-middle items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Image
        source={icon}
        resizeMode="contain"
        className="w-7 h-7 mx-4"
        tintColor="#FFF"
      />
      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
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

export default ProfileButton;
