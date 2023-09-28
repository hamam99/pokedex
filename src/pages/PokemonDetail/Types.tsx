import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import useGetDetailPokemonV2 from '../../hooks/v2/useGetDetailPokemonV2';

const Types = ({name}: {name: string}) => {
  const {data, isLoading, isError} = useGetDetailPokemonV2(name);

  if (isLoading) {
    return (
      <ActivityIndicator animating={isLoading} color={MD2Colors.blue500} />
    );
  }

  const listTypes = data?.types.map(({type}) => type.name);

  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{color: 'black', fontWeight: 'bold'}}>Types : </Text>
      <Text>{listTypes?.toString()}</Text>
    </View>
  );
};

export default Types;
