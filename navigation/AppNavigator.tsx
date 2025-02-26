import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieListScreen from '../screens/MovieListScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import MovieSearchScreen from '../screens/MovieSearchScreen';
import SeatMappingScreen from '../screens/SeatMappingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

export type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
  MovieSearch: undefined;
  SeatMapping: { movieTitle: string };
  Confirmation: { movieTitle: string; selectedSeats: number[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen name="MovieList" component={MovieListScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
        <Stack.Screen name="MovieSearch" component={MovieSearchScreen} />
        <Stack.Screen name="SeatMapping" component={SeatMappingScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;