import React, { useState } from 'react';
import { View, TextInput, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../redux/slices/moviesSlice';
import { RootState } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'MovieSearch'>;

interface Props {
  navigation: NavigationProp;
}

const MovieSearchScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.movies);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      dispatch(searchMovies(text));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        value={query}
        onChangeText={handleSearch}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
          >
            <View style={styles.resultItem}>
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
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  searchBar: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  resultItem: { flexDirection: 'row', marginVertical: 5 },
  poster: { width: 50, height: 75 },
  title: { fontSize: 16, marginLeft: 10, alignSelf: 'center' },
});

export default MovieSearchScreen;