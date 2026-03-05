import { useState, useMemo, useEffect } from 'react';

import ItemSection from './ItemSection';
import ItemFilters from './ItemFilters';
import Sidebar from './Sidebar';
import { useFetchItems } from '../hooks/useFetchItems';

import '../css/reset.css';
import { formatName } from '../utils/formatNumber';
import { useItemFilters } from '../hooks/useItemFilters';

export default function Shop() {
  // const { search, category, maxPrice, minPrice } = useItemFilters;

  const { data: pokeItemDetail, isPending, error } = useFetchItems();

  const [selectedCategory, setSelectedCategory] = useState<Array<string> | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const { filteredItems, categories, minPrice, maxPrice } = useMemo(() => {
    if (!pokeItemDetail) return { filteredItems: [], categories: [], minPrice: 0, maxPrice: 0 };

    let min = Infinity;
    let max = -Infinity;
    const categorySet = new Set<string>();

    const filtered = pokeItemDetail.filter((item) => {
      if (!item) return null;
      categorySet.add(item.category);

      if (item.price < min) min = item.price;
      if (item.price > max) max = item.price;

      const matchesCategory = selectedCategory
        ? // ? formatName(item.category) === formatName(selectedCategory)
          item.category === selectedCategory
        : true;

      const matchesPrice = priceRange
        ? item.price >= priceRange[0] && item.price <= priceRange[1]
        : true;

      return matchesCategory && matchesPrice;
    });

    return {
      filteredItems: filtered,
      categories: [...categorySet],
      minPrice: min === Infinity ? 0 : min,
      maxPrice: max === -Infinity ? 0 : max,
    };
  }, [pokeItemDetail, selectedCategory, priceRange]);

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
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPriceRange}
          />
          {pokeItemDetail && <ItemSection items={filteredItems} />}
          {isPending && <p>Loading...</p>}
        </div>
      </section>
    </>
  );
}
