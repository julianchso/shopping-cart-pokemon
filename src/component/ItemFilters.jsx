import { useEffect } from 'react';

import { formatName } from '../utils/formatNumber';

function ItemFilters({
  minPrice,
  maxPrice,
  categories,
  selectedCategory,
  onCategoryChange,
  onPriceChange,
}) {
  return (
    <div>
      <div className='categories'>
        {categories.map((category) => (
          <label key={category}>
            <input
              type='checkbox'
              name='category'
              checked={selectedCategory === category}
              onChange={() =>
                onCategoryChange(selectedCategory === category ? null : [...category])
              }
            />
            {/* {formatName(category)} */}
            {category}
          </label>
        ))}
        <button type='reset' onClick={() => onCategoryChange(null)}>
          Clear All
        </button>
      </div>
    </div>
  );
}

export default ItemFilters;

{
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
}
