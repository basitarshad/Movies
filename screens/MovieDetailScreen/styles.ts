import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    poster: { width: "100%", height: 500 },
    title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
    genres: { fontSize: 16, color: "#666" },
    overview: {
      fontSize: 14,
      marginVertical: 10,
      textAlign: "justify",
      color: "#8f8f8f",
    },
    videoContainer: {
      flex: 1,
      backgroundColor: "#000",
      justifyContent: "center",
    },
    video: { width: "100%", height: "80%" },
    genresContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 5,
    },
    genreTag: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 16,
      marginRight: 8,
    },
    genreText: {
      color: "#ffff",
      fontSize: 14,
      fontWeight: "700",
    },
    headingText: {
      marginTop: 15,
      fontSize: 18,
      fontWeight: "500",
      color: "#202C43",
    },
    searchIcon: { resizeMode: "contain", width: 25, height: 25 },
    customHeader: {
      paddingTop: 80,
      paddingBottom: 10,
      flexDirection: "row",
      paddingHorizontal: 15,
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      color: "#fff",
      marginLeft: 20,
      fontWeight: "500",
    },
    getTicketsBtnText: {
      backgroundColor: "#61C3F2",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      width: "60%",
      alignSelf: "center",
    },
    watchTrailerContainer: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#61C3F2",
      borderRadius: 10,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      width: "60%",
      alignSelf: "center",
    },
    btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    separator: {
      flex: 1,
      borderTopWidth: 0.17,
      borderColor: "#8f8f8f",
      marginTop: 15,
    },
    releaseDate: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      marginBottom: 10,
      fontWeight: "bold",
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  });