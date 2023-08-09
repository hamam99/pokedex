import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {IRequest, ResultListPokemon} from '../../services/types';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {listPokemon, offsetListPokemon} from '../../stores';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getListPokemon} from '../../services';

const PokemonList = () => {
  const {width} = useWindowDimensions();
  const [isLoading, setLoading] = useState(false);

  const [listPokemonRecoil, setListPokemonRecoil] = useRecoilState(listPokemon);
  const [offsetList, setOffsetList] = useRecoilState(offsetListPokemon);

  useEffect(() => {
    getAllPokemon({
      limit: 50,
      offset: 0,
    });
  }, []);

  const getAllPokemon = async ({limit = 8, offset = 0}: IRequest) => {
    setLoading(true);
    const {error, response} = await getListPokemon({
      limit,
      offset,
    });
    setLoading(false);

    if (response && response?.length > 0) {
      setListPokemonRecoil([...listPokemonRecoil, ...response]);
      setOffsetList(offset + limit);
    }
  };

  const loadMore = async () => {
    if (isLoading) {
      return;
    }
    getAllPokemon({
      offset: offsetList,
    });
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

  return (
    <View>
      {isLoading && (
        <ActivityIndicator animating={true} color={MD2Colors.blue500} />
      )}
      <FlatGrid
        itemDimension={(width - 50) / 2}
        data={listPokemonRecoil}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        refreshing={isLoading}
      />
    </View>
  );
};

export default PokemonList;
