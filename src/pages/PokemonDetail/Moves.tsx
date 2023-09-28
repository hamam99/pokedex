import {View, Text, FlatList} from 'react-native';
import React from 'react';
import useGetDetailPokemonV2 from '../../hooks/v2/useGetDetailPokemonV2';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Moves = ({name}: {name: string}) => {
  const {data, isLoading, isError} = useGetDetailPokemonV2(name);

  if (isLoading) {
    return (
      <ActivityIndicator animating={isLoading} color={MD2Colors.blue500} />
    );
  }

  const listMoves = data?.moves?.slice(0, 10)?.map(item => item?.move?.name);

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
