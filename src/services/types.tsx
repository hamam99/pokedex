export type IDefaultResponse = {
  code: number;
  message: string;
};

export type IResponseFormat<K = null, V = null> = {
  response: K | null;
  error: V | null;
};

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

export interface ResultListPokemon {
  name: string;
  url: string;
}

export interface PokemonListTypes {
  name: string;
  id: string;
}