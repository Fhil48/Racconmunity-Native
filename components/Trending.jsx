import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View, 
  ScrollView
} from "react-native";
import { icons, images } from "../constants";
import { router } from "expo-router";
import TicketButton from "./profile/TicketButton";
import { useNavigation } from '@react-navigation/native';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const navigation = useNavigation();

  return (
    <Animatable.View
    className="mr-5"
    animation={activeItem === item.$id ? zoomIn : zoomOut}
    duration={500}
  >
    <TouchableOpacity
      className="relative flex justify-center items-center"
      activeOpacity={0.7}
      onPress={() => router.push({ pathname: 'home/filterEvents', params: { type: item.type } })}
    >
      <ImageBackground
        source={item.thumbnail}
        className="w-72 h-60 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40 justify-between pb-6"
        resizeMode="cover"
      >
        <View className="mt-16 ml-4">
          <Text className="text-white text-xl font-pbold">
            {item.title}
          </Text>
          <Text className="text-white text-sm font-pbold">Se parte de</Text>
          <Text className="text-white text-sm font-pbold">
            nuestra comunidad
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </Animatable.View>
  );
};

const Trending = ({ posts, refreshing, onRefresh }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={{ flex: 1, width: '100%' }}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default Trending;
