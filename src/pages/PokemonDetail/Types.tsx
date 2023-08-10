import {View, Text} from 'react-native';
import React from 'react';
import {detailPokemon} from '../../stores';
import {useRecoilValue} from 'recoil';

const Types = () => {
  const detailPokemonRecoil = useRecoilValue(detailPokemon);
  const listTypes = detailPokemonRecoil?.types.map(({type}) => type.name);
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>Types : </Text>
      <Text>{listTypes?.toString()}</Text>
    </View>
  );
};

export default Types;
