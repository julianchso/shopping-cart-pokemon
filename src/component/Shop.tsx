import { useState, useMemo, useEffect } from 'react';

import ItemSection from './ItemSection';
import { ItemFilters } from './ItemFilters';
import { useFetchItems } from '../hooks/useFetchItems';

import '../css/reset.css';
import { useItemFilters } from '../hooks/useItemFilters';

export default function Shop() {
  const { search, categories, maxPrice, minPrice } = useItemFilters();

  const {
    data: pokeItemDetail,
    isPending,
    error,
  } = useFetchItems({ search, categories, maxPrice, minPrice });

  const { filterCategories, filterMinPrice, filterMaxPrice } = useMemo(() => {
    if (!pokeItemDetail) {
      return {
        filterCategories: [],
        filterMinPrice: undefined,
        filterMaxPrice: undefined,
      };
    }

    let min = Infinity;
    let max = -Infinity;
    const categories = new Set<string>();

    for (const { category, price } of pokeItemDetail) {
      categories.add(category);
      if (price < min) min = price;
      if (price > max) max = price;
    }

    const sortedCategories = [...categories].sort();

    return {
      filterCategories: [...sortedCategories],
      filterMinPrice: min === Infinity ? undefined : min,
      filterMaxPrice: max === -Infinity ? undefined : max,
    };
  }, [pokeItemDetail]);

  const filteredItems = useMemo(() => {
    if (!pokeItemDetail) return [];

    const filteredItems = pokeItemDetail.filter((item) => {
      const matchesSearch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesCategory =
        !categories || categories.length !== 0 ? categories.includes(item.category) : true;
      const matchesMin = minPrice !== undefined ? item.price >= minPrice : true;
      const matchesMax = maxPrice !== undefined ? item.price <= maxPrice : true;
      const matchesPrice = matchesMin && matchesMax;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    return filteredItems;
  }, [pokeItemDetail, search, categories, minPrice, maxPrice]);

  return (
    <>
      <section id='shop' className='section'>
        <div className='shop__content'>
          <aside className='shop__filters'>
            <ItemFilters
              filterMinPrice={filterMinPrice}
              filterMaxPrice={filterMaxPrice}
              filterCategories={filterCategories}
            />
            {error && <p>Error: {error.message}</p>}
          </aside>

          <div className='items'>
            <ItemSection items={filteredItems} />
            {isPending && <p>Loading...</p>}
          </div>
        </div>
      </section>
    </>
  );
}
