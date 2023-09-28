import {atom, selector} from 'recoil';
import {PokemonDetailTypes} from '../services/types/PokemonDetailTypes';
import {PokemonListTypes} from '../services/types/PokemonListTypes';

export const listPokemon = atom<PokemonListTypes[]>({
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
      return list.filter(item => item.name.includes(filter));
    }
    return list;
  },
});

export const detailPokemon = atom<PokemonDetailTypes | null>({
  key: 'detail-pokemon',
  default: null,
});
