import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import styles from "./styles";

import Left from "../../assets/leftChevron-black.png";
import SeatYellow from "../../assets/seat-yellow.png";
import SeatGray from "../../assets/seat-gray.png";
import SeatPurple from "../../assets/seat-purple.png";
import SeatBlue from "../../assets/seat-blue.png";

type RoutePropType = RouteProp<RootStackParamList, "Confirmation">;
type NavigationProp = StackNavigationProp<RootStackParamList, "Confirmation">;
type SeatComponentProps = {
  seatImg1: ImageSourcePropType;
  seatText1: string;
  seatImg2: ImageSourcePropType;
  seatText2: string;
};

interface Props {
  route: RoutePropType;
  navigation: NavigationProp;
}

const ConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { movieTitle } = route.params;

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
        <Text style={styles.headerSubtitle}>12:30 | Hall 1</Text>
      </View>
    </View>
  );

  const SeatComponent: React.FC<SeatComponentProps> = ({
    seatImg1,
    seatText1,
    seatImg2,
    seatText2,
  }) => (
    <View style={styles.seatInfoContainer}>
      <View style={styles.seatImgTextContainer}>
        <Image source={seatImg1} style={styles.seatImg} />
        <Text style={styles.seatText}>{seatText1}</Text>
      </View>
      <View style={[styles.seatImgTextContainer, { marginLeft: 40 }]}>
        <Image source={seatImg2} style={styles.seatImg} />
        <Text style={styles.seatText}>{seatText2}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.seatmapContainer}>
        <Image
          source={require("../../assets/seatmap.png")}
          style={styles.seatmap}
        />
      </View>
      <SeatComponent
        seatImg1={SeatYellow}
        seatText1={"Selected"}
        seatImg2={SeatGray}
        seatText2={"Not available"}
      />
      <SeatComponent
        seatImg1={SeatPurple}
        seatText1={"VIP (150$)"}
        seatImg2={SeatBlue}
        seatText2={"Regular (50 $)"}
      />
      <View style={styles.rowContainer}>
        <Text style={{ fontWeight: "700" }}>4 /</Text>
        <Text style={{ fontSize: 10 }}> 3 row</Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>{"    "}x</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={{ fontSize: 12 }}>Total Price</Text>
          <Text style={styles.priceNumber}>$ 50</Text>
        </View>
        <TouchableOpacity style={styles.proceedToPay}>
          <Text style={styles.proceedToPayText}>Proceed to pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmationScreen;
