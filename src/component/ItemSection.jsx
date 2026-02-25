import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useFetchItemDetail } from '../services and helpers/fetchItem';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import '../css/global.css';

export default function ItemSection() {
  const pokeItemDetail = useFetchItemDetail();
  const [query, setQuery] = useState('');

  const filteredItems = pokeItemDetail.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className='page__container'>
        <div className='searchBar'>
          <Form action='' role='search' className='searchBar__form'>
            <input
              className='searchBar__input'
              type='search'
              id='q'
              name='q'
              placeholder='Search for item...'
              aria-label='Search pokeItem'
              defaultValue={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='searchBar__button' type='button'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </Form>
        </div>
        <div className='items__section'>
          <ul className='shop__container'>
            {Object.values(filteredItems).map((item) => {
              return <ItemCard item={item} key={item.id} className='itemCard' />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

ItemSection.propTypes = {
  pokeItemDetail: PropTypes.object,
};
