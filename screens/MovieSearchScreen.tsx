import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, fetchAllMovies } from '../redux/slices/moviesSlice';
import { RootState } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import SearchIcon from '../assets/search.png'
import CrossIcon from '../assets/close.png'

type NavigationProp = StackNavigationProp<RootStackParamList, 'MovieSearch'>;

interface Props {
  navigation: NavigationProp;
}

const MovieSearchScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { allMovies, searchResults, loading, error, currentPage, totalPages } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      dispatch(searchMovies(text));
    }
  };

  const CustomHeader = () => {
      return(
        <View style={styles.customHeader}>
          <View 
            style={{
              borderRadius:50, 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              paddingHorizontal:10, 
              paddingVertical:15, 
              backgroundColor:'#f5f5f5'
            }}>
              <Image 
                source={SearchIcon} 
                style={[ styles.iconStyles, { transform: [{ scaleX: -1 }] }, ]}
              />
              <TextInput
                style={styles.searchBar}
                placeholder="TV shows, movies and more..."
                value={query}
                onChangeText={handleSearch}
                autoFocus
              />
              <TouchableOpacity
                onPress={() => {
                  handleSearch('')
                }}
              >
                <Image
                  source={CrossIcon}
                  style={styles.iconStyles}
                />
              </TouchableOpacity>
          </View>
        </View>
      );
  }

  const loadMoreMovies = useCallback(() => {
    if (!loading && currentPage < totalPages) {
      dispatch(fetchAllMovies(currentPage + 1));
    }
  }, [dispatch, loading, currentPage, totalPages]);

  const moviesToDisplay = searchResults.length > 0 ? searchResults : allMovies;

  return (
    <View style={styles.container}>
      <CustomHeader/>
      {loading && moviesToDisplay.length === 0 && <ActivityIndicator size="large" color="#000" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={moviesToDisplay}
        renderItem={({ item }) => {
          return(
          <TouchableOpacity
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
            style={styles.movieTile}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
              onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
            />
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          </TouchableOpacity>
        )}}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        listEmptyComponent={
          !loading && <Text style={styles.emptyText}>No movies found</Text>
        }
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && moviesToDisplay.length > 0 ? (
            <ActivityIndicator size="small" color="#000" style={styles.loadingMore} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBar: {
    flex: 1,
    paddingHorizontal: 5,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
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
  title: {
    fontSize: 14,
    color: '#fff',
  },
  errorText: { color: 'red', textAlign: 'center', marginVertical: 10 },
  emptyText: { textAlign: 'center', marginVertical: 20, color: '#666' },
  loadingMore: { marginVertical: 10 },
  iconStyles:{ resizeMode: 'contain', width: 25, height: 25 },
  customHeader:   { 
    paddingTop:80,
    paddingBottom:10,
    backgroundColor: '#fff', 
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});

export default MovieSearchScreen;