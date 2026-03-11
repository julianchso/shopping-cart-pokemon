import { useEffect, useState, useRef } from 'react';

import { useItemFilters } from '../hooks/useItemFilters';
import { Form } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
  const { search, categories, maxPrice, minPrice, setFilters } = useItemFilters();

  const [localSearch, setLocalSearch] = useState(search);
  const [localMin, setLocalMin] = useState('');
  const [localMax, setLocalMax] = useState('');

  const debouncedSearch = useDebounce(localSearch, 250);

  const initMinPrice = useRef(false);
  const initMaxPrice = useRef(false);

  useEffect(() => {
    setLocalSearch(search ?? '');
  }, [search]);

  useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch]);

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
      <div className='searchBar'>
        <Form
          action=''
          role='search'
          className='searchBar__form'
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className='searchBar__input'
            type='search'
            id='q'
            name='q'
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder='Search items...'
            aria-label='Search pokeItem'
          />
          <button className='searchBar__button' type='button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </Form>
      </div>
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
            className='filter__categories__button'
            type='reset'
            onClick={() => setFilters({ categories: filterCategories })}
          >
            Select All
          </button>
          <button
            className='filter__categoriesButton'
            type='reset'
            onClick={() => setFilters({ categories: [] })}
          >
            Clear All
          </button>
        </div>
        {filterCategories &&
          filterCategories.map((category) => (
            <label key={category}>
              <input
                type='checkbox'
                name='category'
                checked={categories?.includes(category)}
                onChange={(e) => {
                  const checked = e.target.checked;

                  const next = checked
                    ? [...categories, category]
                    : categories.filter((c) => c !== category);

                  setFilters({ categories: next });
                }}
              />
              {formatName(category)}
            </label>
          ))}
      </div>
    </>
  );
}
