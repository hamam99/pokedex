import {View, Text} from 'react-native';
import React from 'react';
import useGetEvolutionChain from '../../hooks/useGetEvolutionChain';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const EvolutionChain = ({idPokemon}: {idPokemon: string}) => {
  const {data, loading} = useGetEvolutionChain(idPokemon);

  if (loading) {
    return <ActivityIndicator animating={loading} color={MD2Colors.blue300} />;
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
