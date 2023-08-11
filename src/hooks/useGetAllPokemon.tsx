import {useState, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {listPokemon, nextOffsetListPokemon, searchQuery} from '../stores';
import {getListPokemon} from '../services';
import {ToastAndroid} from 'react-native';
import {IRequest} from '../services/types/PokemonListTypes';

const useGetAllPokemon = () => {
  const [loading, setLoading] = useState(true);
  const [listPokemonRecoil, setListPokemonRecoil] = useRecoilState(listPokemon);
  const [offsetList, setOffsetList] = useRecoilState(nextOffsetListPokemon);
  const [searchQueryRecoil, setSearchQueryRecoil] = useRecoilState(searchQuery);

  useEffect(() => {
    fetchAllPokemon({
      limit: 8,
      offset: 0,
    });
  }, []);

  const fetchAllPokemon = async ({limit = 8, offset = 0}: IRequest) => {
    setLoading(true);
    const {error, response} = await getListPokemon({
      limit,
      offset,
    });
    setLoading(false);

    if (response) {
      setListPokemonRecoil([...listPokemonRecoil, ...response]);
      setOffsetList(offset + limit);
      return;
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  const loadMore = async () => {
    if (loading) {
      return;
    }

    if (searchQueryRecoil.length > 0) {
      return;
    }

    fetchAllPokemon({
      offset: offsetList,
    });
  };
  return {loading, loadMore};
};

export default useGetAllPokemon;
