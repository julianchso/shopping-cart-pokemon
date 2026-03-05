import { useState } from 'react';
import { Form } from 'react-router-dom';
import PropTypes from 'prop-types';

import ItemCard from './ItemCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import '../css/global.css';

ItemSection.propTypes = {
  items: PropTypes.array.isRequired,
};

export default function ItemSection({ items = [] }) {
  const [query, setQuery] = useState('');

  const filteredItems = items.filter((item) => {
    if (!item) return;
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className='searchBar'>
        <Form action='' role='search' className='searchBar__form'>
          <input
            className='searchBar__input'
            type='search'
            id='q'
            name='q'
            placeholder='Search items...'
            aria-label='Search pokeItem'
            defaultValue={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='searchBar__button' type='button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </Form>
      </div>
      <div className='shop__container'>
        {Object.values(filteredItems).map((item) => {
          return <ItemCard item={item} key={item.id} className='itemCard' />;
        })}
      </div>
    </>
  );
}

ItemSection.propTypes = {
  pokeItemDetail: PropTypes.object,
};
