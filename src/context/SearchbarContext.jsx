// import { useState, useContext, createContext } from 'react';
// import PropTypes from 'prop-types';
// import { useFetchItemDetail } from '../services and helpers/fetchItem';

// export const SearchBarContext = createContext({});

// export function useSearchBar() {
//   return useContext(SearchBarContext);
// }

// export function SearchBarProvider({ children }) {
//   const [query, setQuery] = useState('');
//   const items = useFetchItemDetail();

//   console.log(items);

//   const filteredItems = items.name.filter((item) => {
//     return item.toLowerCase().includes(query.toLowerCase());
//   });

//   const searchValue = (e) => {
//     setQuery(e.target.value);
//   };

//   const providerValue = {
//     searchValue,
//     query,
//   };

//   console.log(`query: ${query}`);

//   return (
//     <>
//       <SearchBarContext.Provider value={providerValue}>{children}</SearchBarContext.Provider>
//     </>
//   );
// }

// SearchBarProvider.propTypes = {
//   children: PropTypes.object,
// };
