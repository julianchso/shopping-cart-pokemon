import { useShoppingCart } from '../context/ShoppingCartContext';
// import { usePokeItemDetail } from '../routes/context/PokeItemContext';
import { formatUnit, formatName } from '../utils/formatNumber';

import '../css/global.css';
import '../css/app.css';

export function CartItemCard(item) {
  const { removeFromCart, cart } = useShoppingCart();

  if (item == null) return null;

  const totalPrice = item.quantity * item.price;

  return (
    <>
      <div className='cart__item__container'>
        <img src={item.img} className='cart__item__img' />
        <div>
          <h2>{item.name}</h2>
          <h3>Category: {formatName(item.category)}</h3>
        </div>
        <div>₽{item.price}</div>
        <div>{formatUnit(item.quantity)}</div>
        <div>₽{totalPrice}</div>
        <button className='cart__item__remove' onClick={() => removeFromCart(item.id)}></button>
      </div>
    </>
  );
}
