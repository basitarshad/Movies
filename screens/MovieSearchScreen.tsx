import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, fetchAllMovies } from "../redux/slices/moviesSlice";
import { RootState } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import genreData from "../utils/genreIds.json";
import { TabBar } from "./MovieListScreen";

type NavigationProp = StackNavigationProp<RootStackParamList, "MovieSearch">;

interface Props {
  navigation: NavigationProp;
}

const MovieSearchScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { allMovies, searchResults, loading, error, currentPage, totalPages } =
    useSelector((state: RootState) => state.movies);

  const genreMap = Object.fromEntries(
    genreData.genres.map((genre) => [genre.id, genre.name])
  );

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      dispatch(searchMovies(text));
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  const loadMoreMovies = useCallback(() => {
    if (!loading && currentPage < totalPages) {
      dispatch(fetchAllMovies(currentPage + 1));
    }
  }, [dispatch, loading, currentPage, totalPages]);

  const moviesToDisplay = query.length > 2 ? searchResults : allMovies;

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <View style={styles.searchContainer}>
          <Image
            source={require("../assets/search.png")}
            style={[styles.iconStyles, { transform: [{ scaleX: -1 }] }]}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="TV shows, movies and more..."
            value={query}
            onChangeText={handleSearch}
            autoFocus
          />
          <TouchableOpacity onPress={clearSearch}>
            <Image
              source={require("../assets/close.png")}
              style={styles.iconStyles}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Indicator */}
      {loading && moviesToDisplay.length === 0 && (
        <ActivityIndicator size="large" color="#000" />
      )}

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Movie List */}
      <FlatList
        data={moviesToDisplay}
        renderItem={({ item }) => {
          const displayText =
            query.length > 2
              ? item.title
              : genreMap[item.genre_ids[0]] || "Unknown"; // Show genre name or movie title

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MovieDetail", { movieId: item.id })
              }
              style={styles.movieTile}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
                onError={(e) =>
                  console.log("Image load error:", e.nativeEvent.error)
                }
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2}>
                  {displayText}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        keyExtractor={(item) => item.id.toString() + Math.random()}
        ListEmptyComponent={
          !loading && <Text style={styles.emptyText}>No movies found</Text>
        }
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && moviesToDisplay.length > 0 ? (
            <ActivityIndicator
              size="small"
              color="#000"
              style={styles.loadingMore}
            />
          ) : null
        }
      />
      <TabBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: {
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#f5f5f5",
  },
  searchBar: { flex: 1, paddingHorizontal: 5 },
  movieTile: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  poster: { width: "100%", height: 200, resizeMode: "cover" },
  titleContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    paddingVertical: 5,
    fontWeight: "700",
  },
  errorText: { color: "red", textAlign: "center", marginVertical: 10 },
  emptyText: { textAlign: "center", marginVertical: 20, color: "#666" },
  loadingMore: { marginVertical: 10 },
  iconStyles: { resizeMode: "contain", width: 25, height: 25 },
  customHeader: {
    paddingTop: Platform.OS == "ios" ? 80 : 30,
    paddingBottom: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default MovieSearchScreen;
