import { useQuery } from '@tanstack/react-query';

export type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  imgSrc: string;
};

export function useFetchItems({ search, category, maxPrice, minPrice }) {
  return useQuery<Item[]>({
    queryKey: ['pokeItems', { search, category, maxPrice, minPrice }],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}data/items.json`);

      if (!res.ok) {
        throw new Error('Failed to fetch items.json');
      }

      const data: Item[] = await res.json();

      return data;
    },
    staleTime: Infinity,
  });
}
