import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ItemFilters } from '../component/ItemFilters';

export function useItemFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const toNumber = (v: string | null) => (v === null || v === '' ? undefined : Number(v));

  const search = (searchParams.get('search') as ItemFilters['search']) ?? '';
  const categories = (searchParams.getAll('categories') as ItemFilters['categories']) ?? [];

  const minPrice = toNumber(searchParams.get('minPrice'));
  const maxPrice = toNumber(searchParams.get('maxPrice'));

  const setFilters = useCallback((filters: Partial<ItemFilters>) => {
    setSearchParams((params) => {
      if (filters.search !== undefined) params.set('search', filters.search);

      if (filters.categories !== undefined) {
        params.delete('categories');
        filters.categories.forEach((category) => params.append('categories', category));
      }

      if (filters.minPrice !== undefined) {
        params.set('minPrice', filters.minPrice.toString());
      } else if ('minPrice' in filters && filters.minPrice === undefined) {
        params.delete('minPrice');
      }

      if (filters.maxPrice !== undefined) {
        params.set('maxPrice', filters.maxPrice.toString());
      } else if ('maxPrice' in filters && filters.maxPrice === undefined) {
        params.delete('maxPrice');
      }
      return params;
    });
  }, []);

  return {
    search,
    categories,
    maxPrice,
    minPrice,
    setFilters,
  };
}
