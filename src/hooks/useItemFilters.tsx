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

  const setFilters = useCallback(
    (filters: Partial<ItemFilters>) => {
      setSearchParams((params) => {
        const next = new URLSearchParams(params);

        if (filters.search !== undefined) {
          if (filters.search) next.set('search', filters.search);
          else next.delete('search');
        }

        if ('categories' in filters) {
          next.delete('categories');

          if (filters.categories) {
            filters.categories.forEach((category) => next.append('categories', category));
          }
        }

        if (filters.minPrice !== undefined) {
          next.set('minPrice', filters.minPrice.toString());
        } else if ('minPrice' in filters && filters.minPrice === undefined) {
          next.delete('minPrice');
        }

        if (filters.maxPrice !== undefined) {
          next.set('maxPrice', filters.maxPrice.toString());
        } else if ('maxPrice' in filters && filters.maxPrice === undefined) {
          next.delete('maxPrice');
        }
        return next;
      });
    },
    [setSearchParams],
  );

  return {
    search,
    categories,
    maxPrice,
    minPrice,
    setFilters,
  };
}
