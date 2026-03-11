import { useState, useMemo, useEffect } from 'react';

import ItemSection from './ItemSection';
import { ItemFilters } from './ItemFilters';
import Sidebar from './Sidebar';
import { useFetchItems } from '../hooks/useFetchItems';

import '../css/reset.css';
import { formatName } from '../utils/formatNumber';
import { useItemFilters } from '../hooks/useItemFilters';

export default function Shop() {
  const { search, categories, maxPrice, minPrice } = useItemFilters();

  const {
    data: pokeItemDetail,
    isPending,
    error,
  } = useFetchItems({ search, categories, maxPrice, minPrice });

  const [selectedCategory, setSelectedCategory] = useState<Array<string> | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

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

    return {
      filterCategories: [...categories],
      filterMinPrice: min === Infinity ? undefined : min,
      filterMaxPrice: max === -Infinity ? undefined : max,
    };
  }, [pokeItemDetail]);

  const filteredItems = useMemo(() => {
    if (!pokeItemDetail) return [];

    return pokeItemDetail.filter((item) => {
      const matchesSearch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesCategory = categories ? categories.includes(item.category) : true;
      const matchesMin = minPrice !== undefined ? item.price >= minPrice : true;
      const matchesMax = maxPrice !== undefined ? item.price <= maxPrice : true;
      const matchesPrice = matchesMin && matchesMax;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [pokeItemDetail, search, categories, minPrice, maxPrice]);

  return (
    <>
      <section id='shop' className='section'>
        <div className='shop__content'>
          <ItemFilters
            filterMinPrice={filterMinPrice}
            filterMaxPrice={filterMaxPrice}
            filterCategories={filterCategories}
          />
          {error && <p>Error: {error.message}</p>}

          {isPending && <p>Loading...</p>}

          <ItemSection items={filteredItems} />
        </div>
      </section>
    </>
  );
}
