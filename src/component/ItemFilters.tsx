import { useEffect, useState } from 'react';

import { useItemFilters } from '../hooks/useItemFilters';
import { Form } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export type ItemFilters = {
  search?: string;
  category?: string;
  filterMinPrice?: number;
  filterMaxPrice?: number;
  minPrice?: number;
  maxPrice?: number;
};

export function ItemFilters({ filterMinPrice, filterMaxPrice }: ItemFilters) {
  const { search, category, maxPrice, minPrice, setFilters } = useItemFilters();

  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 250);

  useEffect(() => {
    setLocalSearch(search ?? '');
  }, [search]);

  useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <div>
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
      <div className='filter__minPrice'>
        <p>Min Price</p>
        <input
          className='filter__minPrice--input'
          type='number'
          id='minPrice'
          name='minPrice'
          min={filterMinPrice}
          value={minPrice ?? ''}
          aria-label='min price filter'
          onChange={(e) =>
            setFilters({
              minPrice: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>
      <div className='filter__maxPrice'>
        <p>Max Price</p>
        <input
          className='filter__maxPrice--input'
          type='number'
          id='maxPrice'
          name='maxPrice'
          max={filterMaxPrice}
          value={maxPrice ?? ''}
          aria-label='max price filter'
          onChange={(e) => {
            setFilters({
              maxPrice: e.target.value ? Number(e.target.value) : undefined,
            });
          }}
        />
      </div>
    </div>
  );
}

// {
/* <div className='price-input-container'>
        <div className='price-input'>
          <div className='price-field'>
            <span>Minimum Price</span>
            <input type='number' className='min-input' />
          </div>
          <div className='price-field'>
            <span>Maximum Price</span>
            <input type='number' className='max-input' />
          </div>
        </div>
        <div className='slider'>
          <div className='price-slider'></div>
        </div>
      </div>

      <div className='range-input'>
        <input type='range' className='min-range' min={minPrice} max={maxPrice} step='1' />
        <input type='range' className='max-range' min={minPrice} max={maxPrice} step='1' />
      </div> */
// }

// function ItemFilters({
//   minPrice,
//   maxPrice,
//   categories,
//   selectedCategory,
//   onCategoryChange,
//   onPriceChange,
// })

// <div className='categories'>
//   {categories.map((category) => (
//     <label key={category}>
//       <input
//         type='checkbox'
//         name='category'
//         checked={selectedCategory === category}
//         onChange={() =>
//           onCategoryChange(selectedCategory === category ? null : [...category])
//         }
//       />
//       {/* {formatName(category)} */}
//       {formatName(category)}
//     </label>
//   ))}
//   <button type='reset' onClick={() => onCategoryChange(null)}>
//     Clear All
//   </button>
// </div>
