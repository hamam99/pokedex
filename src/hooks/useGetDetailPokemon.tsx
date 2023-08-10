import {useState, useEffect} from 'react';
import {getDetailPokemon} from '../services';
import {useRecoilState} from 'recoil';
import {detailPokemon} from '../stores';
import {ToastAndroid} from 'react-native';

const useGetDetailPokemon = (namePokemon: string) => {
  const [loading, setLoading] = useState(true);

  const [detailPokemonRecoil, setDetailPokemonValue] =
    useRecoilState(detailPokemon);

  useEffect(() => {
    fetchData();
  }, [namePokemon]);

  const fetchData = async () => {
    setLoading(true);
    const {error, response} = await getDetailPokemon(namePokemon);
    setLoading(false);
    if (response) {
      setDetailPokemonValue(response);
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  return {loading};
};

export default useGetDetailPokemon;
