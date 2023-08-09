import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import {ResultListPokemon} from '../../services/types';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import {listPokemon} from '../../stores';
import {useRecoilState, useRecoilValue} from 'recoil';
import {getListPokemon} from '../../services';

const PokemonList = () => {
  const MockData = [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
    {
      name: 'charmander',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
    {
      name: 'charmeleon',
      url: 'https://pokeapi.co/api/v2/pokemon/5/',
    },
    {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/',
    },
    {
      name: 'squirtle',
      url: 'https://pokeapi.co/api/v2/pokemon/7/',
    },
    {
      name: 'wartortle',
      url: 'https://pokeapi.co/api/v2/pokemon/8/',
    },
    {
      name: 'blastoise',
      url: 'https://pokeapi.co/api/v2/pokemon/9/',
    },
    {
      name: 'caterpie',
      url: 'https://pokeapi.co/api/v2/pokemon/10/',
    },
  ];
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
