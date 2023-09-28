import {useInfiniteQuery, useQuery} from 'react-query';
import AxiosClient from '../../services/AxiosClient';
import ListUrl from '../../services/ListUrl';
import {ResponseListPokemon} from '../../services/types/PokemonListTypes';
import StringUtils from '../../utils/StringUtils';

const useGetListPokemon = () => {
  return useInfiniteQuery(
    'get-list-pokemon',
    ({pageParam = 0}) => getListPokemonQuery(pageParam),
    {
      enabled: true,
      getNextPageParam: (lastPage, allPages) => {
        const {limit, offset} = StringUtils.getOffsetFromUrl(lastPage?.next);
        return offset;
      },
    },
  );
};

const getListPokemonQuery = async (offset = 0) => {
  return AxiosClient.get(ListUrl.listPokemon, {
    params: {
      limit: 50,
      offset,
    },
  }).then(res => res.data as ResponseListPokemon);
};

export default useGetListPokemon;
