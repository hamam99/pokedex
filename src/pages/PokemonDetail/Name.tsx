import {View, Text} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {detailPokemon} from '../../stores';

const Name = () => {
  const detailPokemonRecoil = useRecoilValue(detailPokemon);

  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          color: 'black',
          fontWeight: 'bold',
        }}>
        {detailPokemonRecoil?.name}
      </Text>
    </View>
  );
};

export default React.memo(Name);
