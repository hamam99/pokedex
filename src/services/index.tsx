import {useRecoilState} from 'recoil';
import AxiosClient from './AxiosClient';
import ListUrl from './ListUrl';
import {
  IRequest,
  IResponseFormat,
  ResponseListPokemon,
  ResultListPokemon,
} from './types';

export const getListPokemon = async ({
  limit = 8,
  offset = 0,
}: IRequest): Promise<IResponseFormat<ResultListPokemon[], string>> => {
  try {
    const res = await AxiosClient.get(ListUrl.listPokemon, {
      params: {
        limit,
        offset,
      },
    });
    const data = res.data as ResponseListPokemon;

    return {
      response: data.results,
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.message;
    return {
      response: [],
      error: errorData ?? 'Terjadi kesalahan, coba lagi!',
    };
  }
};
