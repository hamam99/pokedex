const ListUrl = {
  listPokemon: 'pokemon',
  detailPokemon: (name: string) => `pokemon/${name}`,
  pokemonSpecies: (id: string) => `pokemon-species/${id}`,
  evolutionChain: (id: string) => `evolution-chain/${id}`,
};

export default ListUrl;
