import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type RoutePropType = RouteProp<RootStackParamList, 'Confirmation'>;

interface Props {
  route: RoutePropType;
}

const ConfirmationScreen: React.FC<Props> = ({ route }) => {
  const { movieTitle, selectedSeats } = route.params;
  const total = selectedSeats.length * 15;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movieTitle}</Text>
      <Text>March 7, 2021 | 7:30 PM</Text>
      <Text style={styles.subtitle}>Selected Seats: {selectedSeats.join(', ')}</Text>
      <Text style={styles.price}>Total: ${total}</Text>
      <Button title="Proceed to Pay" onPress={() => {}} color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginVertical: 10 },
  price: { fontSize: 18, fontWeight: 'bold', marginVertical: 20 },
});

export default ConfirmationScreen;