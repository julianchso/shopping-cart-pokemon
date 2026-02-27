import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '../services and helpers/fetchItems';

function useItems() {
  return useQuery({
    queryKey: ['pokeItems'],
    queryFn: fetchItems,
  });
}

export default useItems;
