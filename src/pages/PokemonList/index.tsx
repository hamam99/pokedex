import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {ActivityIndicator, MD2Colors, TextInput} from 'react-native-paper';
import {filteredPokemon, searchQuery} from '../../stores';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import useGetAllPokemon from '../../hooks/useGetAllPokemon';
import {
  PokemonListTypes,
  ResponseListPokemon,
  ResultListPokemon,
} from '../../services/types/PokemonListTypes';
import useGetListPokemon from '../../services/useGetListPokemon';
import StringUtils from '../../utils/StringUtils';

const PokemonList = () => {
  const {width} = useWindowDimensions();

  const {navigate} = useNavigation();

  // const [searchQueryRecoil, setSearchQueryRecoil] = useRecoilState(searchQuery);
  // const filteredPokemonRecoil = useRecoilValue(filteredPokemon);
  // const {loading, loadMore} = useGetAllPokemon();
  // let loading, loadMore;

  const {data, isLoading, isError, fetchNextPage} = useGetListPokemon();
  console.log(`data`, {data});

  // const getAllPages = (): ResultListPokemon[] => {
  //   const arr = [];
  //   data?.pages.forEach(page => {
  //     arr.push(page?.results);
  //   });
  //   return arr;
  // };

  const allItems: ResultListPokemon[] = React.useMemo(
    () => data?.pages.flatMap(page => page.results),
    [data?.pages],
  );

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

  const onChangeSearch = (query: string) => {
    setSearchQueryRecoil(query);
  };

  return (
    <View style={{paddingTop: 8, flex: 1}}>
      {/* <TextInput
        onChangeText={onChangeSearch}
        label="Search"
        mode="outlined"
        value={searchQueryRecoil}
        multiline={false}
        style={{
          marginHorizontal: 10,
        }}
      /> */}

      <FlatGrid
        itemDimension={(width - 50) / 2}
        data={allItems}
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
