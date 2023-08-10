import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {IRequest, PokemonListTypes} from '../../services/types';
import {ActivityIndicator, MD2Colors, TextInput} from 'react-native-paper';
import {
  filteredPokemon,
  listPokemon,
  nextOffsetListPokemon,
  searchQuery,
} from '../../stores';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getListPokemon} from '../../services';
import {useNavigation} from '@react-navigation/native';

const PokemonList = () => {
  const {width} = useWindowDimensions();
  const [isLoading, setLoading] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');

  const {navigate} = useNavigation();

  const [listPokemonRecoil, setListPokemonRecoil] = useRecoilState(listPokemon);
  const [offsetList, setOffsetList] = useRecoilState(nextOffsetListPokemon);
  const [searchQueryRecoil, setSearchQueryRecoil] = useRecoilState(searchQuery);

  const filteredPokemonRecoil = useRecoilValue(filteredPokemon);

  useEffect(() => {
    getAllPokemon({
      limit: 8,
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
      return;
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  const loadMore = async () => {
    if (isLoading) {
      return;
    }

    if (searchQueryRecoil.length > 0) {
      return;
    }

    getAllPokemon({
      offset: offsetList,
    });
  };

  const renderItem = ({item}: {item: PokemonListTypes}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('PokemonDetail', {
            name: item.name,
            id: item.id,
          });
        }}>
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

  const onChangeSearch = (query: string) => {
    setSearchQueryRecoil(query);
  };

  return (
    <View style={{paddingTop: 8, flex: 1}}>
      <TextInput
        onChangeText={onChangeSearch}
        label="Search"
        mode="outlined"
        value={searchQueryRecoil}
        multiline={false}
        style={{
          marginHorizontal: 10,
        }}
      />

      <ActivityIndicator animating={isLoading} color={MD2Colors.blue500} />
      <FlatGrid
        itemDimension={(width - 50) / 2}
        data={filteredPokemonRecoil}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text>No pokemon</Text>}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        refreshing={isLoading}
      />
    </View>
  );
};

export default PokemonList;
