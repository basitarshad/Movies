import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Modal, StyleSheet } from 'react-native';
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

  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.genres}>{movie.genres.map((g) => g.name).join(', ')}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      {trailer && (
        <Button title="Watch Trailer" onPress={() => setShowVideo(true)} color="#007AFF" />
      )}
      <Button
        title="Get Tickets"
        onPress={() => navigation.navigate('SeatMapping', { movieTitle: movie.title })}
        color="#007AFF"
      />
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
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  poster: { width: '100%', height: 300 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  genres: { fontSize: 16, color: '#666' },
  overview: { fontSize: 14, marginVertical: 10 },
  videoContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  video: { width: '100%', height: '80%' },
});

export default MovieDetailScreen;