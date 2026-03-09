import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ItemFilters } from '../component/ItemFilters';

export function useItemFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = (searchParams.get('search') as ItemFilters['search']) ?? '';
  const category = searchParams.get('category') as ItemFilters['category'];

  const maxPrice = searchParams.get('maxPrice')
    ? parseInt(searchParams.get('maxPrice') as string)
    : undefined;

  const minPrice = searchParams.get('minPrice')
    ? parseInt(searchParams.get('minPrice') as string)
    : undefined;

  const setFilters = useCallback((filters: ItemFilters) => {
    // receives current params in the URL
    setSearchParams((params) => {
      if (filters.search !== undefined) {
        params.set('search', filters.search);
      }

      if (filters.category) {
        params.set('category', filters.category);
      }

      if (filters.minPrice !== undefined) {
        params.set('minPrice', filters.minPrice.toString());
      } else {
        params.delete('minPrice');
      }

      if (filters.maxPrice !== undefined) {
        params.set('maxPrice', filters.maxPrice.toString());
      } else {
        params.delete('maxPrice');
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
