import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {ActivityIndicator, MD2Colors, TextInput} from 'react-native-paper';
import {filteredPokemon, searchQuery} from '../../stores';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import useGetAllPokemon from '../../hooks/useGetAllPokemon';
import {PokemonListTypes} from '../../services/types/PokemonListTypes';

const PokemonList = () => {
  const {width} = useWindowDimensions();

  const {navigate} = useNavigation();

  const [searchQueryRecoil, setSearchQueryRecoil] = useRecoilState(searchQuery);
  const filteredPokemonRecoil = useRecoilValue(filteredPokemon);
  const {loading, loadMore} = useGetAllPokemon();

  const renderItem = ({item}: {item: PokemonListTypes}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          gotoPokemonDetail(item.id, item.name);
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

  const gotoPokemonDetail = (id: string, name : string) => {
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

      <ActivityIndicator animating={loading} color={MD2Colors.blue500} />
      <FlatGrid
        itemDimension={(width - 50) / 2}
        data={filteredPokemonRecoil}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text>No pokemon</Text>}
        onEndReached={loadMore}
        onEndReachedThreshold={0}
        refreshing={loading}
      />
    </View>
  );
};

export default PokemonList;
