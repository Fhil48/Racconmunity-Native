import { router, usePathname } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants";

const colorBackground = {
  pets: "bg-[#91ff7f]",
  house: "bg-[#4e41dc]",
  food: "bg-[#eb643a]",
};

const TicketButton = ({ title, type, isLoading, ticket }) => {
  const pathname = usePathname();

  return (
    <TouchableOpacity
      onPress={() => {
        if (pathname.startsWith("/tickets")) router.setParams({ ticket });
        else router.push(`profile/tickets/${ticket}`);
      }}
      activeOpacity={0.7}
      className={`${
        colorBackground[type]
      }  rounded-xl min-h-[62px] mt-5 p-2 flex flex-row place-content-between items-center ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <View className="bg-white p-2 rounded-3xl mr-4">
        <Image source={icons[type]} className="w-10 h-10" />
      </View>
      <Text className={`text-primary font-psemibold text-lg`}>{title}</Text>
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

export default TicketButton;
