import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type RoutePropType = RouteProp<RootStackParamList, 'MovieDetail'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;

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
        { params: { api_key: '024d69b581633d457ac58359146c43f6' } }
      );
      setMovie(movieResponse.data);

      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        { params: { api_key: '024d69b581633d457ac58359146c43f6' } }
      );
      const trailerData = videoResponse.data.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailerData) setTrailer(`https://www.youtube.com/watch?v=${trailerData.key}`);
    };
    fetchMovieDetails();
  }, [movieId]);

  const getGenreStyle = (genreName) => {
    switch (genreName) {
      case 'Action':
        return { backgroundColor: '#15D2BC' }; // Teal
      case 'Thriller':
        return { backgroundColor: '#E26CA5' }; // Pink
      case 'Science Fiction':
        return { backgroundColor: '#CD9D0F' }; // Gold
      default:
        return { backgroundColor: '#564CA3' }; // Gray for others
    }
  };

  if (!movie) return <Text>Loading...</Text>;
  console.log('trailer ==>', trailer)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      >
        <View style={{position:'absolute', bottom:50, width:'100%'}}>
        <TouchableOpacity
          style={{backgroundColor:'#61C3F2', borderRadius:10, justifyContent:'center', alignItems:'center', paddingVertical:15, width:'60%', alignSelf:'center'}}
          onPress={() => navigation.navigate('SeatMapping', { movieTitle: movie.title })}
        >
          <Text style={{color:'#fff', fontWeight:'700', fontSize:16}}>
            Get Tickets
          </Text>
        </TouchableOpacity>
      {trailer && (
        <TouchableOpacity
        style={{backgroundColor:'transparent', borderWidth:2, borderColor:'#61C3F2', borderRadius:10,marginTop:10, justifyContent:'center', alignItems:'center', paddingVertical:15, width:'60%', alignSelf:'center'}}
        onPress={() => setShowVideo(true)}
        >
          <Text style={{color:'#fff', fontWeight:'700', fontSize:16}}>Watch Trailer</Text>
        </TouchableOpacity>
        )}
        </View>
        </ImageBackground>
      <View style={{paddingHorizontal:40}}>
      <Text style={styles.headingText}>Genres</Text>
        <View style={styles.genresContainer}>
          {movie.genres.map((genre) => {
            return (
              <View
                key={genre.id}
                style={[styles.genreTag, getGenreStyle(genre.name)]}
              >
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            );
          })}
        </View>
        <View style={{flex:1, borderTopWidth:0.17, borderColor:'#8f8f8f',marginTop:15}}/>
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
          <Button title="Done" onPress={() => setShowVideo(false)} color="#007AFF" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:'#fff' },
  poster: { width:'100%', height: 500 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  genres: { fontSize: 16, color: '#666' },
  overview: { fontSize: 14, marginVertical: 10, textAlign:'justify', color:'#8f8f8f' },
  videoContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  video: { width: '100%', height: '80%' },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:10
  },
  genreTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    // marginBottom: 8,
  },
  genreText: {
    color: '#ffff',
    fontSize: 14,
    fontWeight:'700'
  },
  headingText:{marginTop:15, fontSize:18, fontWeight:'500', color:'#202C43'}
});

export default MovieDetailScreen;