import { Link } from 'react-router-dom';
// import NavbarSearch from './navbarSearch';
import { useShoppingCart } from '../context/ShoppingCartContext';

import pokeStoreLogo from '../media/pokeStoreLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import '../css/app.css';
import '../css/global.css';

export default function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <>
      <nav className='navbar'>
        <div className='navbar__primary'>
          <img src={pokeStoreLogo} alt='pokeStoreLogo' id='navbar__pokestore--logo' />
          <ul className='navbar__primary--menu'>
            <li>
              <Link to={`/shopping-cart-pokemon/home`}>Home</Link>
            </li>
            <li>
              <Link to={`/shopping-cart-pokemon/shop`}>Shop</Link>
            </li>
          </ul>
        </div>
        <div className='navbar__cart'>
          {/* <NavbarSearch /> */}
          <Link to={`/shopping-cart-pokemon/cart`}>
            <button className='navbar__cart--btn' onClick={openCart}>
              <FontAwesomeIcon className='navbar__cart--icon' icon={faCartShopping} />
              <div className='navbar__cart--qty'>{cartQuantity}</div>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
