import React, { useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../redux/slices/moviesSlice';
import { RootState } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

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

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={upcoming}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
          >
            <View style={styles.movieItem}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
              />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  movieItem: { margin: 10 },
  poster: { width: '100%', height: 200 },
  title: { color: '#fff', fontSize: 16, position: 'absolute', bottom: 10, left: 10 },
});

export default MovieListScreen;