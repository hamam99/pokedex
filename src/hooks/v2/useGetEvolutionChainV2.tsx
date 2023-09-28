import {useQuery} from 'react-query';
import AxiosClient from '../../services/AxiosClient';
import ListUrl from '../../services/ListUrl';
import {PokemonSpeciesTypes} from '../../services/types/PokemonSpeciesTypes';
import StringUtils from '../../utils/StringUtils';
import {EvolutionChainTypes} from '../../services/types/EvolutionChainTypes';
import getPokemonEvolutionChain from '../../utils/getPokemonEvolutionChain';
import {useEffect, useState} from 'react';

const useGetEvolutionChainV2 = (id: string) => {
  const [evolutionChain, setEvolutionChain] = useState<string[]>([]);
  const {data: dataId, isLoading: isLoadingId} = useQuery(
    ['get-evolution-id', id],
    () =>
      AxiosClient.get(ListUrl.pokemonSpecies(id)).then(
        res => res.data as PokemonSpeciesTypes,
      ),
    {},
  );

  const {data: dataEvo, isLoading: isLoadingEvo} = useQuery(
    ['get-evolution-chain', dataId],
    () =>
      AxiosClient.get(
        ListUrl.evolutionChain(
          StringUtils.getIdFromUrl(dataId?.evolution_chain?.url!!),
        ),
      ).then(res => res.data as EvolutionChainTypes),
    {
      enabled: StringUtils.getIdFromUrl(dataId?.evolution_chain?.url) !== null,
    },
  );

  useEffect(() => {
    if (!dataEvo) {
      return;
    }

    setEvolutionChain(getPokemonEvolutionChain(dataEvo));
  }, [dataEvo]);

  return {
    data: evolutionChain,
    isLoading: isLoadingId || isLoadingEvo,
  };
};

export default useGetEvolutionChainV2;
