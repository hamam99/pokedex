import {View, Text} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {detailPokemon} from '../../stores';

const HeightAndWeight = () => {
  const detailPokemonRecoil = useRecoilValue(detailPokemon);

  return (
    <View style={{rowGap: 8}}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          {'Height : '}
        </Text>
        <Text>{detailPokemonRecoil?.height}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          {'Weight : '}
        </Text>
        <Text>{detailPokemonRecoil?.weight}</Text>
      </View>
    </View>
  );
};

export default HeightAndWeight;
