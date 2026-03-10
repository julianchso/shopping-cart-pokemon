import { useState, useMemo, useEffect } from 'react';

import ItemSection from './ItemSection';
import { ItemFilters } from './ItemFilters';
import Sidebar from './Sidebar';
import { useFetchItems } from '../hooks/useFetchItems';

import '../css/reset.css';
import { formatName } from '../utils/formatNumber';
import { useItemFilters } from '../hooks/useItemFilters';

export default function Shop() {
  const { search, category, maxPrice, minPrice } = useItemFilters();

  const {
    data: pokeItemDetail,
    isPending,
    error,
  } = useFetchItems({ search, category, maxPrice, minPrice });

  const [selectedCategory, setSelectedCategory] = useState<Array<string> | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const { filterCategories, filterMinPrice, filterMaxPrice } = useMemo(() => {
    if (!pokeItemDetail) {
      return {
        filterCategories: [],
        filterMinPrice: 0,
        filterMaxPrice: 0,
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
      filterMinPrice: min === Infinity ? 0 : min,
      filterMaxPrice: max === -Infinity ? 0 : max,
    };
  }, [pokeItemDetail]);

  const filteredItems = useMemo(() => {
    if (!pokeItemDetail) return [];

    return pokeItemDetail.filter((item) => {
      const matchesSearch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesCategory = category ? item.category === category : true;
      const matchesMin = minPrice !== undefined ? item.price >= minPrice : true;
      const matchesMax = maxPrice !== undefined ? item.price <= maxPrice : true;
      const matchesPrice = matchesMin && matchesMax;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [pokeItemDetail, search, category, minPrice, maxPrice]);

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
