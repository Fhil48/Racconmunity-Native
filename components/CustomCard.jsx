import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ReadMoreText from 'react-native-read-more-text';

export function CustomCard({ title, image, description, date, onPress, creator, cancelar, onPressCancel, state }) {
  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text className="mt-2 text-secondary-200" onPress={handlePress}>
        Leer más
      </Text>
    );
  };

  const renderRevealedFooter = (handlePress) => {
    return (
      <Text className="mt-2 text-secondary-200" onPress={handlePress}>
        Leer menos
      </Text>
    );
  };

  return (
    <View style={styles.card} className="relative">
      <View style={styles.cardHeader} className="relative">
        <Image
          source={{ uri: image }}
          style={styles.cardImage}
        />
        {state && 
          <Text
            className={`p-2 text-white text-sm font-pregular rounded absolute bottom-0 right-0 ${
              state === 'active' 
                ? 'bg-green-700' 
                : state === 'canceled' 
                ? 'bg-gray-500' 
                : 'bg-gray-800'
            }`}
            styles={{ padding:'10px' }}
          >
            {state === 'active' 
              ? 'Activo' 
              : state === 'canceled' 
              ? 'Cancelado' 
              : 'Finalizado'}
          </Text>
        }
      </View>
      <View style={styles.cardBody} className="relative">
        <Text style={styles.cardTitle} className="text-gray-800">{title}</Text>
        <ReadMoreText
          numberOfLines={3}
          renderTruncatedFooter={renderTruncatedFooter}
          renderRevealedFooter={renderRevealedFooter}
          textStyle={{ color: '#FFF' }}
        >
          <Text className="text-black-200">{description}</Text>
        </ReadMoreText>
      </View>
      <View style={styles.cardFooter} className="flex-row gap-2">
        {cancelar && state === 'active' && <TouchableOpacity style={styles.button} className="w-full flex-1 bg-gray-800" onPress={onPressCancel}>
          <Text style={styles.buttonText} className="text-center text-gray-300">Cancelar evento</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.button} className="bg-orange-400 w-full flex-1" onPress={onPress}>
          <Text style={styles.buttonText} className="text-center text-white">Ver más</Text>
        </TouchableOpacity> 
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    height: 200,
    backgroundColor: '#607d8b',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 16,
    color: '#757575',
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eeeeee',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
  },
});
