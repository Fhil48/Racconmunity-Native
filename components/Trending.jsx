import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../constants";

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
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative flex justify-center items-center"
        activeOpacity={0.7}
      >
        <ImageBackground
          source={item.thumbnail}
          className="w-72 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        >
          <View className="mt-20 ml-4">
            <Text className="text-white text-xl font-pbold  ">
              {item.title}
            </Text>
            <Text className="text-white text-sm font-pbold ">Se parte de</Text>
            <Text className="text-white text-sm font-pbold ">
              nuestro grupo
            </Text>
          </View>

          <TouchableOpacity className="border-2 border-white rounded-lg mt-4 ml-4 w-40 flex flex-row items-center py-2 px-4">
            <Text className="text-white text-sm font-pbold ">Acompañanos</Text>
            <Image source={icons.rightArrow} className="ml-2" />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
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
    />
  );
};

export default Trending;
