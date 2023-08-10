import {useState, useEffect} from 'react';
import {getEvolutionChain, getIdEvolutionChain} from '../services';

function useGetEvolutionChain(idPokemon: string) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [idPokemon]);

  const fetchData = async () => {
    setLoading(true);
    const {response: idEvolution = '0', error: errorIdEvolution} =
      await getIdEvolutionChain(idPokemon);
    const {response, error} = await getEvolutionChain(idEvolution!!);
    setLoading(false);

    if (response) {
      setData(response);
    }

    if (error ?? errorIdEvolution) {
      setError(error ?? errorIdEvolution);
    }
  };

  return {data, loading, error};
}

export default useGetEvolutionChain;
