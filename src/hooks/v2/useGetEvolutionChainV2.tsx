import {useQueries, useQuery} from 'react-query';
import AxiosClient from '../../services/AxiosClient';
import ListUrl from '../../services/ListUrl';
import {PokemonSpeciesTypes} from '../../services/types/PokemonSpeciesTypes';
import StringUtils from '../../utils/StringUtils';
import {EvolutionChainTypes} from '../../services/types/EvolutionChainTypes';
import getPokemonEvolutionChain from '../../utils/getPokemonEvolutionChain';

const useGetEvolutionChainV2 = (id: string) => {
  const {data: dataId, isLoading: isLoadingId} = useQuery(
    'get-evolution-id',
    () =>
      AxiosClient.get(ListUrl.pokemonSpecies(id)).then(
        res => res.data as PokemonSpeciesTypes,
      ),
    {
      enabled: false,
    },
  );

  const idEvolution = StringUtils.getIdFromUrl(dataId?.evolution_chain?.url);

  const {data: dataEvo, isLoading: isLoadingEvo} = useQuery(
    'get-evolution-chain',
    () =>
      AxiosClient.get(ListUrl.evolutionChain(idEvolution)).then(
        res => res.data as EvolutionChainTypes,
      ),
    {
      enabled: idEvolution !== null ?? idEvolution !== undefined,
    },
  );

  const pokemonEvolution = getPokemonEvolutionChain(dataEvo);

  return {
    data: pokemonEvolution,
    isLoading: isLoadingId || isLoadingEvo,
  };
};

export default useGetEvolutionChainV2;
