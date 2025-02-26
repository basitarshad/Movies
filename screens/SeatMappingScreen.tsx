import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type RoutePropType = RouteProp<RootStackParamList, 'SeatMapping'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'SeatMapping'>;

interface Props {
  route: RoutePropType;
  navigation: NavigationProp;
}

interface Seat {
  id: number;
  type: 'VIP' | 'Regular';
  available: boolean;
}

const SeatMappingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { movieTitle } = route.params;
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const seats: Seat[] = Array(20).fill(null).map((_, i) => ({
    id: i + 1,
    type: i < 5 ? 'VIP' : 'Regular',
    available: i % 3 !== 0,
  }));

  const toggleSeat = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movieTitle}</Text>
      <Text>March 7, 2021 | 7:30 PM</Text>
      <View style={styles.seatGrid}>
        {seats.map((seat) => (
          <TouchableOpacity
            key={seat.id}
            style={[
              styles.seat,
              seat.type === 'VIP' && styles.vipSeat,
              !seat.available && styles.unavailableSeat,
              selectedSeats.includes(seat.id) && styles.selectedSeat,
            ]}
            onPress={() => seat.available && toggleSeat(seat.id)}
            disabled={!seat.available}
          />
        ))}
      </View>
      <View style={styles.legend}>
        <Text>Selected: ■</Text>
        <Text>VIP: ■</Text>
        <Text>Regular: ■</Text>
        <Text>Not Available: ■</Text>
      </View>
      <Button
        title="Select Seats"
        onPress={() => navigation.navigate('Confirmation', { movieTitle, selectedSeats })}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  seatGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 20 },
  seat: { width: 20, height: 20, margin: 5, backgroundColor: '#00f' },
  vipSeat: { backgroundColor: '#800080' },
  unavailableSeat: { backgroundColor: '#ccc' },
  selectedSeat: { backgroundColor: '#0f0' },
  legend: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});

export default SeatMappingScreen;