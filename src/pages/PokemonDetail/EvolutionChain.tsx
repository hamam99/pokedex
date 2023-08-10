import {View, Text} from 'react-native';
import React from 'react';
import useGetEvolutionChain from '../../hooks/useGetEvolutionChain';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const EvolutionChain = ({idPokemon}: {idPokemon: string}) => {
  const {data = [], loading, error} = useGetEvolutionChain(idPokemon);

  return (
    <View>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
        }}>
        Evolution Chain
      </Text>
      {<Text>{data.join(' -> ')}</Text>}
      {loading && (
        <ActivityIndicator animating={loading} color={MD2Colors.blue300} />
      )}
    </View>
  );
};

export default React.memo(EvolutionChain);
