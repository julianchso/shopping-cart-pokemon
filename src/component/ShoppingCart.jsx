import { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { CartItemCard } from '../component/CartItemCard';

import { Offcanvas } from 'react-bootstrap';

import '../css/global.css';

export function ShoppingCart(isOpen) {
  const { openCart, closeCart, cart, cartTotal } = useShoppingCart();

  const checkout = () => {
    alert(
      `Successfully checked out ₽{cartTotal} worth of items! (If this were a real store it would lead to the payments page).`,
    );
  };

  return (
    <>
      <div className='cart__container'>
        <div className='cart__header'>
          <span>Item</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
        <div className='cart__body'>
          {cart.map((item) => (
            <CartItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className='cart__total'>Total: ₽{cartTotal}</div>
      <button type='submit' id='cart__checkout' onClick={checkout}>
        <span>Checkout</span>
      </button>

      {/* TODO: Get Offcanvas to work */}
      {/* <Offcanvas show={true} onHide={closeCart} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.map((item) => (
            <CartItemCard key={item.id} {...item} />
          ))}
        </Offcanvas.Body>
      </Offcanvas> */}
    </>
  );
}
