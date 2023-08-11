import {useRecoilState} from 'recoil';
import AxiosClient from './AxiosClient';
import ListUrl from './ListUrl';
import {IResponseFormat} from './types/GeneralTypes';
import {PokemonDetailTypes} from './types/PokemonDetailTypes';
import {PokemonSpeciesTypes} from './types/PokemonSpeciesTypes';
import {EvolutionChainTypes} from './types/EvolutionChainTypes';
import getPokemonEvolutionChain from '../utils/getPokemonEvolutionChain';
import StringUtils from '../utils/StringUtils';
import { PokemonListTypes, ResponseListPokemon } from './types/PokemonListTypes';

export const getListPokemon = async ({
  limit = 8,
  offset = 0,
}: IRequest): Promise<IResponseFormat<PokemonListTypes[], string>> => {
  try {
    const res = await AxiosClient.get(ListUrl.listPokemon, {
      params: {
        limit,
        offset,
      },
    });
    const data = res.data as ResponseListPokemon;

    const result = data?.results.map(item => ({
      name: item.name,
      id: StringUtils.getIdFromUrl(item.url),
    }));

    const castedResult: PokemonListTypes[] = result;

    return {
      response: castedResult,
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.message;
    return {
      response: null,
      error: errorData ?? 'Terjadi kesalahan, coba lagi!',
    };
  }
};

export const getDetailPokemon = async (
  name: string,
): Promise<IResponseFormat<PokemonDetailTypes, string>> => {
  try {
    const res = await AxiosClient.get(ListUrl.detailPokemon(name));

    const data = res.data as PokemonDetailTypes;

    return {
      response: data,
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.message;
    return {
      response: null,
      error: errorData ?? 'Terjadi kesalahan, coba lagi!',
    };
  }
};
export const getIdEvolutionChain = async (
  idPokemon: string,
): Promise<IResponseFormat<string, string>> => {
  try {
    const res = await AxiosClient.get(ListUrl.pokemonSpecies(idPokemon));

    const data = res.data as PokemonSpeciesTypes;
    const idEvolution = StringUtils.getIdFromUrl(data?.evolution_chain.url);

    return {
      response: idEvolution,
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.message;
    return {
      response: null,
      error: errorData ?? 'Terjadi kesalahan, coba lagi!',
    };
  }
};

export const getEvolutionChain = async (
  idEvolutionChain: string,
): Promise<IResponseFormat<string[], string>> => {
  try {
    const res = await AxiosClient.get(ListUrl.evolutionChain(idEvolutionChain));

    const data = res.data as EvolutionChainTypes;
    const pokemonEvolution = getPokemonEvolutionChain(data);

    return {
      response: pokemonEvolution,
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.message;
    return {
      response: null,
      error: errorData ?? 'Terjadi kesalahan, coba lagi!',
    };
  }
};


