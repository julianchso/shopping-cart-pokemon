import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useItemFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');
  const category = searchParams.get('category');

  const maxPrice = searchParams.get('maxPrice')
    ? parseInt(searchParams.get('maxPrice') as string)
    : undefined;

  const minPrice = searchParams.get('minPrice')
    ? parseInt(searchParams.get('minPrice') as string)
    : undefined;

  // https://www.youtube.com/watch?v=gMoni2Hm92U 9:42
  const setFilters = useCallback((filters) => {
    setSearchParams((params) => {
      if (filters.search !== undefined) {
        params.set('search', filters.search);
      }

      if (filters.category) {
        params.set('category', filters.category);
      }

      if (filters.maxPrice) {
        params.set('maxPrice', filters.maxPrice);
      }

      if (filters.minPrice) {
        params.set('minPrice', filters.minPrice);
      }

      return params;
    });
  }, []);

  return {
    search,
    category,
    maxPrice,
    minPrice,
    setFilters,
  };
}
