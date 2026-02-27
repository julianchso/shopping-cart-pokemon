import { useState, useMemo } from 'react';

import ItemSection from './ItemSection';
import ItemFilters from './ItemFilters';
import Sidebar from './Sidebar';
import { useFetchItemDetail } from '../hooks/useFetchItem';
import useItems from '../hooks/useItems';

import '../css/reset.css';
import { useParams } from 'react-router-dom';

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

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const filteredItems = useMemo(() => {
    if (!pokeItemDetail) return [];

    return pokeItemDetail.filter((item: Item) => {
      const matchesCategory = category ? item.category === category : true;
      const matchesPrice = priceRange
        ? item.price >= priceRange[0] && item.price <= priceRange[1]
        : true;
    });
  }, [pokeItemDetail, category, priceRange]);

  const priceMin = useMemo(() => {
    if (!pokeItemDetail) return 0;
    return Math.min(...pokeItemDetail.map((i: Item) => i.price));
  }, [pokeItemDetail]);

  const priceMax = useMemo(() => {
    if (!pokeItemDetail) return 0;
    return Math.max(...pokeItemDetail.map((i: Item) => i.price));
  }, [pokeItemDetail]);

  return (
    <>
      {/* <div className='shop'> */}
      <ItemFilters
        items={items}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onCategoryChange={setCategory}
        onPriceChange={setPriceRange}
      />
      <ItemSection items={filteredItems} />
      {/* </div> */}
    </>
  );
}
