import PropTypes from 'prop-types';
import { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';

import '../../global.css';
import './card.css';

Card.propTypes = {
  item: PropTypes.object,
};

export default function Card({ item }) {
  const [qty, setQty] = useState(0);
  const { getItemQty, increaseQty, decreaseQty, addShopQtyToCart, removeFromCart } =
    useShoppingCart();

  const decrementQty = () => {
    if (qty <= 0) {
      setQty(0);
      console.log(qty);
    } else {
      setQty(qty - 1);
      console.log(qty);
    }
  };

  const incrementQty = () => {
    setQty(qty + 1);
    console.log(qty);
  };

  function inputQty(e) {
    const val = Number(e.target.value);
    console.log(val);
    return val <= 0 ? setQty(0) : setQty(val);
  }

  return (
    <div className='cardCtn'>
      <div className='center'>{item.id}</div>
      <div className='cardName center'>{item.name}</div>
      <div className='cardImg center'>
        <img className='center' src={item.src} />
      </div>
      <div className='cardPrice center'>{`$${item.price}`}</div>

      <div className='inputQtyCtn'>
        <button type='button' onClick={() => decrementQty(item.id)}>
          -
        </button>
        <input className='inputQty' type='number' onChange={(e) => inputQty(e)} value={qty} />
        <button type='button' onClick={() => incrementQty(item.id)}>
          +
        </button>
      </div>
      <button type='button' className='addToCartBtn' onClick={() => addShopQtyToCart(item.id, qty)}>
        Add to Cart
      </button>
    </div>
  );
}
