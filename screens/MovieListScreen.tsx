import React, { useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../redux/slices/moviesSlice';
import { RootState } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import SearchIcon from '../assets/search.png'

type NavigationProp = StackNavigationProp<RootStackParamList, 'MovieList'>;

interface Props {
  navigation: NavigationProp;
}

const MovieListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { upcoming, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  const CustomHeader = () => {
    return(
      <View style={styles.customHeader}>
        <Text style={{fontSize:18}}>Watch</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MovieSearch')}
          style={{ marginLeft: 10 }}
          accessibilityLabel="Search movies"
        >
          <Image source={SearchIcon} style={[
            styles.searchIcon,
            { transform: [{ scaleX: -1 }] },
          ]}/>
        </TouchableOpacity>
      </View>
    );
  }
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <CustomHeader />
      <FlatList
        data={upcoming}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
            style={styles.movieTile}
          >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  movieTile: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  poster: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    color: '#fff',
  },
  searchIcon:{ resizeMode: 'contain', width: 25, height: 25 },
  customHeader:   { 
    paddingTop:80,
    paddingBottom:10,
    backgroundColor: '#fff', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});

export default MovieListScreen;