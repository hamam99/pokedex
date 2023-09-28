import {
  Chain,
  EvolutionChainTypes,
} from '../services/types/EvolutionChainTypes';

function getPokemonEvolutionChain(
  evolutionChainData: EvolutionChainTypes,
): string[] {
  const pokemonNames: string[] = [];

  function extractEvolutionName(chain: Chain) {
    pokemonNames.push(chain.species.name);
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach(subChain => extractEvolutionName(subChain));
    }
  }

  extractEvolutionName(evolutionChainData.chain);

  return pokemonNames || [];
}

export default getPokemonEvolutionChain;
