import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    seatGrid: {
      marginVertical: 20,
    },
    seatRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 5,
    },
    seat: {
      width: 20,
      height: 20,
      margin: 5,
      borderRadius: 10,
      backgroundColor: "#00f",
    },
    vipSeat: {
      backgroundColor: "#f00",
    },
    unavailableSeat: {
      backgroundColor: "#ccc",
    },
    selectedSeat: {
      backgroundColor: "#0f0",
    },
    legend: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10,
    },
    leftIcon: { resizeMode: "contain", width: 25, height: 25 },
    customHeader: {
      paddingTop: 80,
      paddingBottom: 10,
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    titleContainer: {
      flex: 1,
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "500",
      color: "#000",
    },
    headerSubtitle: {
      fontSize: 12,
      color: "#61C3F2",
      marginTop:5,
      fontWeight:'500'
    },
    scrollView: {
      backgroundColor: "#fff",
      flexGrow: 1,
    },
    button: {
      width: 60, // Fixed width for consistency
      height: 30, // Fixed height for touch area
      borderRadius: 12, // Rounded corners for pill shape
      justifyContent: "center", // Center text vertically
      alignItems: "center", // Center text horizontally
      marginLeft: 15,
      marginTop: 10,
    },
    selectedButton: {
      backgroundColor: "#61C3F2",
    },
    unselectedButton: {
      backgroundColor: "#F5F5F5", // Light gray for unselected dates
    },
    buttonText: {
      color: "#333333", // Dark gray text color
      fontSize: 12, // Readable font size
      fontWeight: "bold", // Bold text as seen in the image
    },
    headingText: {
      marginTop: 90,
      fontSize: 16,
      fontWeight: "500",
      color: "#202C43",
      marginLeft: 15,
    },
    selectedButtonText: {
      color: "#fff",
    },
    unselectedButtonText: {
      color: "#202C43",
    },
    showtimeContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
      marginLeft: 5,
    },
    panel: {
      flex: 1,
      margin: 10,
      backgroundColor: "#FFFFFF",
    },
    showtimeLabel: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#333333",
    },
    seatmap: {
      width: 200,
      height: 200,
      resizeMode: "contain",
    },
    pricing: {
      fontSize: 12,
      color: "#333333",
      marginTop: 10,
    },
    movieDetailsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    bold: {
      fontWeight: "bold",
    },
    hall:{ color: "#8f8f8f", marginLeft: 5, fontSize: 12 },
    getTicketsBtnText: {
      backgroundColor: "#61C3F2",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      width: "90%",
      position:'absolute',
      bottom:40,
      alignSelf:'center'
    },
    btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  });