import { useState } from 'react';
import { Form } from 'react-router-dom';
import PropTypes from 'prop-types';

import ItemCard from './ItemCard';

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

  const itemCount = filteredItems.length;

  return (
    <>
      <span>Found {itemCount} products</span>
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
