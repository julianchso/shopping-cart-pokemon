import PropTypes from 'prop-types';
import { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';

import { formatName } from '../utils/formatNumber';
import '../css/global.css';

ItemCard.propTypes = {
  item: PropTypes.object,
};

function ItemCard({ item }) {
  const [qty, setQty] = useState(0);
  const { getItemQty, increaseQty, decreaseQty, addShopQtyToCart, removeFromCart } =
    useShoppingCart();

  const decrementQty = () => {
    if (qty <= 0) {
      setQty(0);
    } else {
      setQty((prev) => prev - 1);
    }
  };

  const incrementQty = () => {
    setQty((prev) => prev + 1);
  };

  function inputQty(e) {
    const val = Number(e.target.value);
    return val <= 0 ? setQty(0) : setQty(val);
  }

  function addToCart(item, qty) {
    addShopQtyToCart(item.name, item.id, qty, item.imgSrc, item.price, item.category);
    setQty(0);
  }

  return (
    <div className='shopCard__container'>
      <div className='shopCard__name'>{formatName(item.name)}</div>
      <div className='shopCard__category'>{formatName(item.category)}</div>
      <img className='shopCard__img' src={item.imgSrc} />
      <div className='shopCard__price'>{`₽${item.price}`}</div>

      <div className='shopCard__quantity__container'>
        <button
          type='button'
          className='shopCard__qty shopCard__qty--decrease'
          // onClick={() => decrementQty(item.id)}
          onClick={decrementQty}
        >
          -
        </button>
        <input
          className='shopCard__quantity'
          type='number'
          onChange={(e) => inputQty(e)}
          value={qty}
        />
        <button
          type='button'
          className='shopCard__qty shopCard__qty--increase'
          // onClick={() => incrementQty(item.id)}
          onClick={incrementQty}
        >
          +
        </button>
      </div>
      <button type='button' className='shopCard__addToCart ' onClick={() => addToCart(item, qty)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ItemCard;
