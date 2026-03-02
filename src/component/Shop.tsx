import { useState, useMemo, useEffect } from 'react';

import ItemSection from './ItemSection';
import ItemFilters from './ItemFilters';
import Sidebar from './Sidebar';
import { useFetchItemDetail } from '../hooks/useFetchItem';
import useItems from '../hooks/useItems';

import '../css/reset.css';
import { formatName } from '../utils/formatNumber';

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export default function Shop() {
  const { data: pokeItemDetail, isPending, error } = useItems();

  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const { filteredItems, categories, minPrice, maxPrice } = useMemo(() => {
    if (!pokeItemDetail) return { filteredItems: [], categories: [], minPrice: 0, maxPrice: 0 };

    let min = Infinity;
    let max = -Infinity;
    const categorySet = new Set<string>();

    const filtered = pokeItemDetail.filter((item) => {
      if (!item) return;

      if (!item) return null;
      categorySet.add(item.category);

      if (item.price < min) min = item.price;
      if (item.price > max) max = item.price;

      const matchesCategory = category ? formatName(item.category) === formatName(category) : true;

      const matchesPrice = priceRange
        ? item.price >= priceRange[0] && item.price <= priceRange[1]
        : true;

      return matchesCategory && matchesPrice;
    });

    return {
      filteredItems: filtered,
      categories: [...categorySet],
      minPrice: min === Infinity ? 0 : min,
      maxPrice: max === Infinity ? 0 : max,
    };
  }, [pokeItemDetail, category, priceRange]);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section id='shop' className='section'>
        <div className='shop__content'>
          <ItemFilters
            minPrice={minPrice}
            maxPrice={maxPrice}
            categories={categories}
            selectedCategory={category}
            onCategoryChange={setCategory}
            onPriceChange={setPriceRange}
          />
          <ItemSection items={filteredItems} />
        </div>
      </section>
    </>
  );
}
