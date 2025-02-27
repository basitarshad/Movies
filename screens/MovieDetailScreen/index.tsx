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
import { WebView } from "react-native-webview";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import Config from "react-native-config";
import Left from "../../assets/leftChevron.png";
import styles from "./styles";

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
  release_date: string;
  genres: { id: number; name: string }[];
}

export const formatReleaseDate = (releaseDate: string) => {
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
  return `In Theaters ${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

const MovieDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          { params: { api_key: Config.TMDB_API_KEY } }
        );
        setMovie(movieResponse.data);

        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          { params: { api_key: Config.TMDB_API_KEY } }
        );
        const trailerData = videoResponse.data.results.find(
          (video: any) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailerData) setTrailerKey(trailerData.key);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const genreColors = ["#15D2BC", "#E26CA5", "#CD9D0F", "#564CA3", "#FF5733"];

  const getGenreStyle = (index: number) => ({
    backgroundColor: genreColors[index % genreColors.length],
  });

  const CustomHeader = () => (
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
              navigation.navigate("SeatMapping", { movieTitle: movie })
            }
          >
            <Text style={styles.btnText}>Get Tickets</Text>
          </TouchableOpacity>
          {trailerKey && (
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
          {uniqueGenres.map((genre, index) => (
            <View
              key={genre.id}
              style={[styles.genreTag, getGenreStyle(index)]}
            >
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.separator} />
        <Text style={styles.headingText}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      <Modal visible={showVideo} animationType="fade">
        <View style={styles.videoContainer}>
          {trailerKey && (
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${trailerKey}?autoplay=1`,
              }}
              style={styles.video}
              allowsFullscreenVideo
              javaScriptEnabled
              onError={(e) => console.log("WebView error:", e)}
            />
          )}
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

export default MovieDetailScreen;
