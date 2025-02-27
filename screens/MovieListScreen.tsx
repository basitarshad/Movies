import React, { useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMovies } from "../redux/slices/moviesSlice";
import { RootState } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

import SearchIcon from "../assets/search.png";
import Dashboard from "../assets/dashboard.png";
import Watch from "../assets/watch.png";
import MediaLibrary from "../assets/media_library.png";
import More from "../assets/list.png";

type NavigationProp = StackNavigationProp<RootStackParamList, "MovieList">;

interface Props {
  navigation: NavigationProp;
}

export const TabBar: React.FC<Props> = ({ navigation }) => {
  const tabs = [
    { name: "Dashboard", icon: Dashboard },
    { name: "Watch", icon: Watch },
    { name: "Media Library", icon: MediaLibrary },
    { name: "More", icon: More },
  ];
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("MovieList")}
          key={tab.name + Math.random()}
          style={styles.tab}
        >
          <Image source={tab.icon} style={styles.icon} />
          <Text
            style={[
              styles.label,
              { color: tab.name === "Watch" ? "#ffffff" : "#8F8F8F" },
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const MovieListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { upcoming, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  const CustomHeader = () => {
    return (
      <View style={styles.customHeader}>
        <Text style={{ fontSize: 18 }}>Watch</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("MovieSearch")}
          style={{ marginLeft: 10 }}
          accessibilityLabel="Search movies"
        >
          <Image
            source={SearchIcon}
            style={[styles.searchIcon, { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <CustomHeader />
      <FlatList
        data={upcoming}
        renderItem={({ item }) => (
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
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString() + Math.random()}
      />
      <TabBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  movieTile: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  poster: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
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
    fontWeight: "700",
  },
  searchIcon: { resizeMode: "contain", width: 25, height: 25 },
  customHeader: {
    paddingTop: 80,
    paddingBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#2e2739",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  label: {
    fontSize: 10,
    marginTop: 10,
    fontWeight: "700",
  },
});

export default MovieListScreen;
