import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import SpritesImage from '../../components/SpritesImage';
import useGetDetailPokemonV2 from '../../hooks/v2/useGetDetailPokemonV2';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Sprites = ({name}: {name: string}) => {
  const {data, isLoading, isError} = useGetDetailPokemonV2(name);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Content = () => {
    if (isLoading) {
      return (
        <ActivityIndicator animating={isLoading} color={MD2Colors.blue500} />
      );
    }

    if (!data?.sprites) {
      return <Text>No Sprites</Text>;
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: 8,
            justifyContent: 'space-between',
          }}>
          <SpritesImage url={data?.sprites?.front_default} label={'Front'} />
          <SpritesImage url={data?.sprites?.back_default} label={'Back'} />
          <SpritesImage
            url={data?.sprites?.front_shiny}
            label={'Front Shiny'}
          />
          <SpritesImage url={data?.sprites?.back_shiny} label={'Back Shiny'} />
          <SpritesImage
            url={data?.sprites.front_female}
            label={'Front Female'}
          />
          <SpritesImage
            url={data?.sprites?.back_female}
            label={'Back Female'}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      <Text style={{color: 'black', fontWeight: 'bold', marginBottom: 4}}>
        Sprites
      </Text>
      <Content />
    </View>
  );
};

export default React.memo(Sprites);
