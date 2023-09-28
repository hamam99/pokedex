import {View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Sprites from './Sprites';
import HeightAndWeight from './HeightAndWeight';
import Types from './Types';
import Moves from './Moves';
import Name from './Name';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import EvolutionChain from './EvolutionChain';
import useGetDetailPokemon from '../../hooks/useGetDetailPokemon';

const PokemonDetail = () => {
  const route = useRoute();
  const namePokemon = route.params?.name;
  const idPokemon = route.params?.id;

  const {loading} = useGetDetailPokemon(namePokemon);

  if (loading) {
    return <ActivityIndicator animating={loading} color={MD2Colors.blue500} />;
  }

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 12, flex: 1, rowGap: 8}}>
      <Name name={namePokemon} />
      <Sprites name={namePokemon} />
      <HeightAndWeight name={namePokemon} />
      <Types name={namePokemon} />
      <Moves name={namePokemon} />
      <EvolutionChain idPokemon={idPokemon} />
    </View>
  );
};

export default PokemonDetail;
