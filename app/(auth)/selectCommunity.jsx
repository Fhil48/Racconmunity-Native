import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectCommunity = () => {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 py-6">
                <View className="w-full h-16  flex flex-row  items-center justify-between">
                    <TouchableOpacity onPress={()=> {}}>
                        <Text className="text-white">Hola</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  };
export default SelectCommunity