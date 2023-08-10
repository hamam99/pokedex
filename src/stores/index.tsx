import {atom, selector} from 'recoil';
import {ResultListPokemon} from '../services/types';

export const listPokemon = atom<string[]>({
  key: 'list-pokemon',
  default: [],
});

export const nextOffsetListPokemon = atom({
  key: 'offset-list-pokemon',
  default: 0,
});

export const searchQuery = atom({
  key: 'search-query',
  default: '',
});

export const filteredPokemon = selector({
  key: 'filtered-pokemon',
  get: ({get}) => {
    const filter = get(searchQuery);
    const list = get(listPokemon);

    if (filter.length > 0) {
      return list.filter(item => item.includes(filter));
    }
    return list;
  },
});

export const detailPokemon = atom({
  key: 'detail-pokemon',
  default: {},
});
