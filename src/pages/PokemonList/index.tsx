import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {ResultListPokemon} from '../../services/types';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {listPokemon} from '../../stores';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getListPokemon} from '../../services';

const PokemonList = () => {
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [listPokemonRecoil, setListPokemonRecoil] = useRecoilState(listPokemon);

  useEffect(() => {
    getAllPokemon();
  }, []);

  const getAllPokemon = async () => {
    setLoading(true);
    const {error, response} = await getListPokemon({
      limit: 20,
      offset: 0,
    });
    setLoading(false);

    if (response && response?.length > 0) {
      setListPokemonRecoil([...listPokemonRecoil, ...response]);
    }
  };

  const renderItem = ({item}: {item: ResultListPokemon}) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            textAlign: 'center',
            borderWidth: 1,
            borderRadius: 4,
            borderColor: '#6a6a6a',
            color: 'black',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator animating={true} color={MD2Colors.blue500} />;
  }

  return (
    <View>
      <FlatGrid
        itemDimension={(width - 50) / 2}
        data={listPokemonRecoil}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PokemonList;
