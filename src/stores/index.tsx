import {atom} from 'recoil';

export const listPokemon = atom({
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
