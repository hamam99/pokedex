import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useMemo, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {ActivityIndicator, MD2Colors, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ResultListPokemon} from '../../services/types/PokemonListTypes';
import useGetListPokemon from '../../services/useGetListPokemon';
import StringUtils from '../../utils/StringUtils';

const {width} = Dimensions.get('window');
const PokemonList = () => {
  const navigate = useNavigation().navigate;

  const [searchText, setSearchText] = useState('');
  const {data, isLoading, fetchNextPage} = useGetListPokemon();

  const allItems = React.useMemo(
    () => data?.pages.flatMap(page => page.results),
    [data?.pages],
  ) as ResultListPokemon[];

  const filteredItems = useMemo(() => {
    if (searchText.length <= 0) {
      return allItems;
    }

    return allItems.filter(item => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [searchText, allItems]);

  const onChangeSearch = (query: string) => {
    setSearchText(query);
  };

  const renderItem = ({item}: {item: ResultListPokemon}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          gotoPokemonDetail(StringUtils.getIdFromUrl(item.url), item.name);
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

  const gotoPokemonDetail = (id: string, name: string) => {
    navigate('PokemonDetail', {
      name,
      id,
    });
  };

  return (
    <View style={{paddingTop: 8, flex: 1}}>
      <TextInput
        onChangeText={onChangeSearch}
        label="Search"
        mode="outlined"
        value={searchText}
        multiline={false}
        style={{
          marginHorizontal: 10,
        }}
      />

      <FlatGrid
        itemDimension={(width - 50) / 2}
        data={filteredItems}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text>No pokemon</Text>}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0}
        refreshing={isLoading}
        keyExtractor={item => item?.name}
      />
      <ActivityIndicator animating={isLoading} color={MD2Colors.blue500} />
    </View>
  );
};

export default PokemonList;
