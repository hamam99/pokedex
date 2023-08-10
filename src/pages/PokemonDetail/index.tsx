import {View, Text, ScrollView, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {detailPokemon} from '../../stores';
import {useRecoilState, useRecoilValue} from 'recoil';
import Sprites from './Sprites';
import HeightAndWeight from './HeightAndWeight';
import Types from './Types';
import Moves from './Moves';
import Name from './Name';
import {getDetailPokemon} from '../../services';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import EvolutionChain from './EvolutionChain';

const PokemonDetail = () => {
  const route = useRoute();
  const namePokemon = route.params?.name;
  const idPokemon = route.params?.id;

  const [loading, setLoading] = useState(false);

  const [detailPokemonRecoil, setDetailPokemonValue] =
    useRecoilState(detailPokemon);

  useEffect(() => {
    handleGetDetailPokemon();
  }, [namePokemon]);

  const handleGetDetailPokemon = async () => {
    setLoading(true);
    const {error, response} = await getDetailPokemon(namePokemon);
    setLoading(false);

    if (response) {
      setDetailPokemonValue(response);
      return;
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  if (loading) {
    return <ActivityIndicator animating={loading} color={MD2Colors.blue500} />;
  }

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 12, flex: 1, rowGap: 8}}>
      <Name />
      <Sprites />
      <HeightAndWeight />
      <Types />
      <Moves />
      <EvolutionChain idPokemon={idPokemon} />
    </View>
  );
};

export default PokemonDetail;
