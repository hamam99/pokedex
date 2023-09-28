import {View, Text} from 'react-native';
import React from 'react';
import useGetDetailPokemonV2 from '../../hooks/v2/useGetDetailPokemonV2';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const HeightAndWeight = ({name}: {name: string}) => {
  const {data, isLoading, isError} = useGetDetailPokemonV2(name);

  if (isLoading) {
    return (
      <ActivityIndicator animating={isLoading} color={MD2Colors.blue500} />
    );
  }

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
        <Text>{data?.height || '-'}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
          }}>
          {'Weight : '}
        </Text>
        <Text>{data?.weight || '-'} </Text>
      </View>
    </View>
  );
};

export default HeightAndWeight;
