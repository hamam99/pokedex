import {useQuery} from 'react-query';
import AxiosClient from '../../services/AxiosClient';
import ListUrl from '../../services/ListUrl';
import {PokemonDetailTypes} from '../../services/types/PokemonDetailTypes';

const useGetDetailPokemonV2 = (name: string) => {
  return useQuery('detail-pokemon', () => getDetailPokemonQuery(name));
};

const getDetailPokemonQuery = async (name: string) => {
  return AxiosClient.get(ListUrl.detailPokemon(name)).then(
    res => res.data as PokemonDetailTypes,
  );
};

export default useGetDetailPokemonV2;
