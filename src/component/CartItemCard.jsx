import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatUnit, formatName } from '../utils/formatNumber';

import '../css/global.css';
import '../css/app.css';

export function CartItemCard(item) {
  const { removeFromCart, cart } = useShoppingCart();

  if (item == null) return null;

  const totalPrice = item.quantity * item.price;

  return (
    <div className='cart__item'>
      <img src={item.img} className='cart__item__img' />
      <div className='cart__itemContent'>
        <div data-label='product'>{item.name}</div>
        <div data-label='category'>{formatName(item.category)}</div>
        <div data-label='price'>₽{item.price}</div>
        <div data-label='qty'>{formatUnit(item.quantity)}</div>
        <div data-label='total'>₽{totalPrice}</div>
      </div>
      <button className='cart__item__remove' onClick={() => removeFromCart(item.id)}></button>
    </div>
  );
}
