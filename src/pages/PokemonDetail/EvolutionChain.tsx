import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import useGetEvolutionChainV2 from '../../hooks/v2/useGetEvolutionChainV2';

const EvolutionChain = ({idPokemon}: {idPokemon: string}) => {
  const {data, isLoading} = useGetEvolutionChainV2(idPokemon);

  if (isLoading) {
    return (
      <ActivityIndicator animating={isLoading} color={MD2Colors.blue300} />
    );
  }
  return (
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
        }}>
        Evolution Chain
      </Text>
      {<Text>{data?.join(' -> ')}</Text>}
    </View>
  );
};

export default React.memo(EvolutionChain);
