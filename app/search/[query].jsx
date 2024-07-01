import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { createType } = useLocalSearchParams();
  return (
    <View>
      <Text>{createType}</Text>
    </View>
  );
};

export default Search;

