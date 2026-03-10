import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const cartQuantity = cart.reduce((quantity, item) => item.quantity + quantity, 0);

  const cartTotal = cart.reduce((total, cartItem) => {
    const item = cart.find((i) => i.id === cartItem.id);
    return total + item.price * cartItem.quantity;
  }, 0);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  function getCartQty(id) {
    return cart.find((item) => item.id === id) ? item.quantity : 0;
  }

  function increaseCartQty(id) {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    console.log(cart);
  }

  function decreaseCartQty(id) {
    console.log('decreaseQty');
    setCart((currItems) => {
      // TODO: remove item if quantity is 1
      if (currItems.find((item) => item.id === id).quantity == 1) {
        return [...currItems, { id, quantity: 1 }];
        // TODO end
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
    console.log(cart);
  }

  function addShopQtyToCart(name, id, shopQty, img, price, category) {
    if (shopQty === 0) return;

    setCart((currItems) => {
      // console.log(currItems);
      console.log(currItems);
      if (!currItems.find((item) => item.id === id)) {
        return [...currItems, { name, id, quantity: shopQty, img, price, category }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + shopQty };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    console.log('removeFromCart');

    setCart((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  const providerValue = {
    getCartQty,
    increaseCartQty,
    decreaseCartQty,
    addShopQtyToCart,
    removeFromCart,
    openCart,
    closeCart,
    cart,
    cartQuantity,
    cartTotal,
  };

  return (
    <>
      <ShoppingCartContext.Provider value={providerValue}>
        {children}
        {/* <ShoppingCart isOpen={isOpen} /> */}
      </ShoppingCartContext.Provider>
    </>
  );
}

ShoppingCartProvider.propTypes = {
  openCart: PropTypes.func,
  closeCart: PropTypes.func,
  children: PropTypes.object,
  cartQuantity: PropTypes.number,
  cartItems: PropTypes.array,
  isOpen: PropTypes.bool,
};
