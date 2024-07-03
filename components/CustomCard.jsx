import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ReadMoreText from 'react-native-read-more-text';

export function CustomCard({ title, image, description, date, onPress, creator }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: image }}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>
            <Text className="text-ellipsis">{description}</Text>
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.button} className="bg-orange-400 w-full" onPress={onPress}>
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
