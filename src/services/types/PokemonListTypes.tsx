export interface ResultListPokemon {
  name: string;
  url: string;
}

export interface PokemonListTypes {
  name: string;
  id: string;
}

export type IRequest = {
  offset?: number;
  limit?: number;
};

export interface ResponseListPokemon {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ResultListPokemon[];
}
