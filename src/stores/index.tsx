import {atom} from 'recoil';
import {ResultListPokemon} from '../services/types';

export const listPokemon = atom<ResultListPokemon[]>({
  key: 'list-pokemon',
  default: [],
});

export const offsetListPokemon = atom({
  key: 'offset-list-pokemon',
  default: 0,
});

export const detailPokemon = atom({
  key: 'detail-pokemon',
  default: {},
});
