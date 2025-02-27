import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Video from "react-native-video";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Left from "../assets/leftChevron.png";

type RoutePropType = RouteProp<RootStackParamList, "MovieDetail">;
type NavigationProp = StackNavigationProp<RootStackParamList, "MovieDetail">;

interface Props {
  route: RoutePropType;
  navigation: NavigationProp;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
}

const MovieDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        { params: { api_key: "024d69b581633d457ac58359146c43f6" } }
      );
      setMovie(movieResponse.data);

      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        { params: { api_key: "024d69b581633d457ac58359146c43f6" } }
      );
      const trailerData = videoResponse.data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailerData)
        setTrailer(`https://www.youtube.com/watch?v=${trailerData.key}`);
    };
    fetchMovieDetails();
  }, [movieId]);

  const genreColors = ["#15D2BC", "#E26CA5", "#CD9D0F", "#564CA3", "#FF5733"];

  const getGenreStyle = (index: number) => {
    return { backgroundColor: genreColors[index % genreColors.length] };
  };

  const formatReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `In Theaters ${month} ${day}, ${year}`;
  };

  const CustomHeader = () => {
    return (
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <Image source={Left} style={styles.searchIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Watch</Text>
      </View>
    );
  };

  if (!movie) return <Text>Loading...</Text>;

  const uniqueGenres = movie.genres.filter(
    (genre, index, self) => index === self.findIndex((g) => g.id === genre.id)
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      >
        <CustomHeader />
        <View style={{ position: "absolute", bottom: 50, width: "100%" }}>
          <Text style={styles.releaseDate}>
            {formatReleaseDate(movie.release_date)}
          </Text>
          <TouchableOpacity
            style={styles.getTicketsBtnText}
            onPress={() =>
              navigation.navigate("SeatMapping", { movieTitle: movie.title })
            }
          >
            <Text style={styles.btnText}>Get Tickets</Text>
          </TouchableOpacity>
          {trailer && (
            <TouchableOpacity
              style={styles.watchTrailerContainer}
              onPress={() => setShowVideo(true)}
            >
              <Text style={styles.btnText}>Watch Trailer</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
      <View style={{ paddingHorizontal: 40 }}>
        <Text style={styles.headingText}>Genres</Text>
        <View style={styles.genresContainer}>
          <View style={styles.genresContainer}>
            {uniqueGenres.map((genre, index) => (
              <View
                key={genre.id}
                style={[styles.genreTag, getGenreStyle(index)]}
              >
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.headingText}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      <Modal visible={showVideo} animationType="fade">
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: trailer! }}
            style={styles.video}
            controls={false}
            resizeMode="contain"
            onEnd={() => setShowVideo(false)}
          />
          <Button
            title="Done"
            onPress={() => setShowVideo(false)}
            color="#007AFF"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MovieDetailScreen;
