import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonList from '../pages/PokemonList';
import PokemonDetail from '../pages/PokemonDetail';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="PokemonList"
        component={PokemonList}
        options={{
          headerShown: true,
          header: () => {
            return <Header title="Pokemon List" />;
          },
        }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetail}
        options={{
          headerShown: false,
          header: () => {
            return <Header title="Pokemon Detail" withBack={true} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
