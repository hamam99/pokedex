import {View, Text} from 'react-native';
import React from 'react';
import SpritesImage from '../../components/SpritesImage';
import {useRecoilValue} from 'recoil';
import {detailPokemon} from '../../stores';

const Sprites = () => {
  const detailPokemonRecoil = useRecoilValue(detailPokemon);

  return (
    <View
      style={
        {
          // paddingHorizontal: 12,
        }
      }>
      <Text style={{color: 'black', fontWeight: 'bold', marginBottom: 4}}>
        Sprites
      </Text>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'space-between',
        }}>
        <SpritesImage
          url={detailPokemonRecoil?.sprites.back_default}
          label={'Back'}
        />

        <SpritesImage
          url={detailPokemonRecoil?.sprites.front_default}
          label={'Front'}
        />
        <SpritesImage
          url={detailPokemonRecoil?.sprites.front_shiny}
          label={'Front Shiny'}
        />
        <SpritesImage
          url={detailPokemonRecoil?.sprites.back_shiny}
          label={'Back Shiny'}
        />
      </View>
    </View>
  );
};

export default Sprites;
