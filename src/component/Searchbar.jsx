// import { Form } from 'react-router-dom';
// import { useFetchItemDetail } from '../services and helpers/fetchItem';
// import { useSearchBar } from '../context/SearchbarContext';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import './navbarSearch.css';

// export default function NavbarSearch() {
//   const { searchValue, query } = useSearchBar();

//   return (
//     <div className='navbarSearch'>
//       <Form action='' role='search'>
//         <input
//           className='searchInput'
//           type='search'
//           id='q'
//           name='q'
//           placeholder='Search...'
//           aria-label='Search pokeItem'
//           defaultValue={query}
//           onChange={(e) => searchValue(e)}
//         />
//         <button className='searchBtn'>
//           <FontAwesomeIcon icon={faMagnifyingGlass} />
//         </button>
//       </Form>
//     </div>
//   );
// }
