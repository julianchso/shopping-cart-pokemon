import { useEffect, useState, useRef } from 'react';

import { useItemFilters } from '../hooks/useItemFilters';
import { formatName } from '../utils/formatNumber';

export type ItemFilters = {
  search?: string;
  filterCategories?: Array<string>;
  filterMinPrice?: number;
  filterMaxPrice?: number;
  categories?: Array<string>;
  minPrice?: number;
  maxPrice?: number;
};

export function ItemFilters({ filterMinPrice, filterMaxPrice, filterCategories }: ItemFilters) {
  const { categories, setFilters } = useItemFilters();

  const [localMin, setLocalMin] = useState('');
  const [localMax, setLocalMax] = useState('');

  const initMinPrice = useRef(false);
  const initMaxPrice = useRef(false);

  useEffect(() => {
    if (!initMinPrice.current && filterMinPrice !== undefined) {
      setLocalMin(String(filterMinPrice));
      initMinPrice.current = true;
    }
  }, [filterMinPrice]);

  useEffect(() => {
    if (!initMaxPrice.current && filterMaxPrice !== undefined) {
      setLocalMax(String(filterMaxPrice));
      initMaxPrice.current = true;
    }
  }, [filterMaxPrice]);

  return (
    <>
      <div className='filter__price__container'>
        <span className='filter__subtitle'>Price Range</span>
        <div className='filter__priceInput filter__minPrice'>
          <p className='filter__priceInput__desc'>Min Price</p>
          <input
            className='filter__minPrice--input'
            type='number'
            id='minPrice'
            name='minPrice'
            min={filterMinPrice}
            value={localMin}
            aria-label='min price filter'
            onChange={(e) => {
              const value = e.target.value;
              setLocalMin(value);
              setFilters({
                minPrice: value === '' ? undefined : Number(value),
              });
            }}
          />
        </div>
        <div className='filter__priceInput filter__maxPrice'>
          <p>Max Price</p>
          <input
            className='filter__maxPrice__input'
            type='number'
            id='maxPrice'
            name='maxPrice'
            max={filterMaxPrice}
            value={localMax}
            aria-label='max price filter'
            onChange={(e) => {
              const value = e.target.value;
              setLocalMax(value);
              setFilters({
                maxPrice: value === '' ? undefined : Number(value),
              });
            }}
          />
        </div>
      </div>
      <div className='filter__categories__container'>
        <span className='filter__subtitle'>Categories</span>
        <div className='filter__categories__buttons'>
          <button
            className='filter__categories__selectClear'
            type='reset'
            onClick={() => setFilters({ categories: filterCategories })}
          >
            Select All
          </button>
          <button
            className='filter__categories__selectClear'
            type='reset'
            onClick={() => setFilters({ categories: [] })}
          >
            Clear All
          </button>
        </div>
        <div className='filter__categories__checkbox'>
          {filterCategories &&
            filterCategories.map((category) => (
              <label key={category} className='filter__categories__label'>
                <input
                  type='checkbox'
                  name='category'
                  checked={categories?.includes(category)}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    const next = checked
                      ? [...(categories ?? []), category]
                      : (categories ?? []).filter((c) => c !== category);

                    setFilters({
                      // if categories exist, then show what's in next. Otherwise categories is undefined and shows all items
                      categories: next.length ? next : undefined,
                    });
                  }}
                />
                <span className='filter__categories__button button'>{formatName(category)}</span>
              </label>
            ))}
        </div>
      </div>
    </>
  );
}
