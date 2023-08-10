import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {detailPokemon} from '../../stores';

const Moves = () => {
  const detailPokemonRecoil = useRecoilValue(detailPokemon);
  const listMoves = detailPokemonRecoil?.moves
    ?.slice(0, 10)
    ?.map(item => item?.move?.name);
  return (
    <View style={{rowGap: 0}}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>Moves</Text>
      <FlatList
        data={listMoves}
        renderItem={({item, index}) => {
          return (
            <Text>
              {index + 1}. {item?.replace('-', ' ')}
            </Text>
          );
        }}
      />
    </View>
  );
};

export default React.memo(Moves);
