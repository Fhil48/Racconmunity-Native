import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ReadMoreText from 'react-native-read-more-text';

export function CustomCard({ title, image, description, date, onPress, creator, cancelar, onPressCancel, state }) {
  return (
    <View style={styles.card}>
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
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>
            <Text className="text-ellipsis">{description}</Text>
        </Text>
      </View>
      <View style={styles.cardFooter} className="flex-row gap-2">
        {cancelar && <TouchableOpacity style={styles.button} className="bg-red-800 w-full flex-1" onPress={onPressCancel}>
          <Text style={styles.buttonText} className="text-center">Cancelar evento</Text>
        </TouchableOpacity>}
        <TouchableOpacity style={styles.button} className="bg-orange-400 w-full flex-1" onPress={onPress}>
          <Text style={styles.buttonText} className="text-center">Ver más</Text>
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
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    color: '#607d8b',
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
    color: '#fff',
    fontSize: 16,
  },
});
