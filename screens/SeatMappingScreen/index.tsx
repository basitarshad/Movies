import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

import Left from "../../assets/leftChevron-black.png";
import { formatReleaseDate } from "../MovieDetailScreen";
import styles from "./styles";

type RoutePropType = RouteProp<RootStackParamList, "SeatMapping">;
type NavigationProp = StackNavigationProp<RootStackParamList, "SeatMapping">;

interface Props {
  route: RoutePropType;
  navigation: NavigationProp;
}

interface Seat {
  id: number;
  type: "VIP" | "Regular";
  available: boolean;
}

const SeatMappingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { movieTitle } = route.params;
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();

  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const seats: Seat[] = Array(20)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      type: i < 5 ? "VIP" : "Regular",
      available: i % 3 !== 0,
    }));

  const toggleSeat = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const CustomHeader = () => (
    <View style={styles.customHeader}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 10 }}
      >
        <Image source={Left} style={styles.leftIcon} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{movieTitle.title}</Text>
        <Text style={styles.headerSubtitle}>
          {formatReleaseDate(movieTitle.release_date)}
        </Text>
      </View>
    </View>
  );

  const renderSeatGrid = () => {
    const seatsPerRow = 5;
    const rows = [];

    for (let i = 0; i < seats.length; i += seatsPerRow) {
      const rowSeats = seats.slice(i, i + seatsPerRow);
      rows.push(
        <View key={i} style={styles.seatRow}>
          {rowSeats.map((seat) => (
            <TouchableOpacity
              key={seat.id}
              style={[
                styles.seat,
                seat.type === "VIP" && styles.vipSeat,
                !seat.available && styles.unavailableSeat,
                selectedSeats.includes(seat.id) && styles.selectedSeat,
              ]}
              onPress={() => seat.available && toggleSeat(seat.id)}
              disabled={!seat.available}
            />
          ))}
        </View>
      );
    }

    return rows;
  };

  const ShowtimePanel = ({ showtime, hall, price, bonus }) => (
    <View style={styles.panel}>
      <View style={styles.movieDetailsContainer}>
        <Text style={styles.showtimeLabel}>{showtime}</Text>
        <Text style={styles.hall}>{hall}</Text>
      </View>
      <View
        style={{
          borderWidth: 2,
          borderColor: "#A5D8FF",
          borderRadius: 10,
          paddingHorizontal: 40,
        }}
      >
        <Image
          source={require("../../assets/seatmap.png")}
          style={styles.seatmap}
        />
      </View>
      <View style={styles.movieDetailsContainer}>
        <Text style={styles.pricing}>
          From <Text style={styles.bold}>{price}$</Text> or{" "}
          <Text style={styles.bold}>{bonus} bonus</Text>
        </Text>
      </View>
    </View>
  );

  const ShowtimeSelector = () => (
    <View style={styles.showtimeContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignSelf: "flex-start" }}
      >
        <ShowtimePanel
          showtime="12:30"
          hall="Cinetec + Hall 1"
          price="50"
          bonus="2500"
        />
        <ShowtimePanel showtime="13:30" hall="Cinetec" price="75" bonus="300" />
        <ShowtimePanel showtime="15:30" hall="Cinetec" price="85" bonus="450" />
        <ShowtimePanel showtime="17:30" hall="Cinetec" price="75" bonus="300" />
        <ShowtimePanel showtime="18:30" hall="Cinetec" price="85" bonus="450" />
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader />
      <Text style={styles.headingText}>Date</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignSelf: "flex-start" }}
        >
          {dates.map((date) => (
            <TouchableOpacity
              key={date.toISOString()}
              style={[
                styles.button,
                date.toDateString() === selectedDate.toDateString()
                  ? styles.selectedButton
                  : styles.unselectedButton,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.buttonText,
                  date.toDateString() === selectedDate.toDateString()
                    ? styles.selectedButtonText
                    : styles.unselectedButtonText,
                ]}
              >
                {date.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ShowtimeSelector />
      <TouchableOpacity
        style={styles.getTicketsBtnText}
        onPress={() =>
          navigation.navigate("Confirmation", {
            movieTitle,
            selectedSeats,
            selectedDate,
          })
        }
      >
        <Text style={styles.btnText}>Select Seats</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeatMappingScreen;
