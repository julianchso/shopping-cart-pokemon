import { useState, useEffect } from 'react';

import { useItemFilters } from '../hooks/useItemFilters';
import { Form } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Searchbar() {
  const { search, setFilters } = useItemFilters();
  const [localSearch, setLocalSearch] = useState(search);

  const debouncedSearch = useDebounce(localSearch, 250);

  // useEffect(() => {
  //   setLocalSearch(search ?? '');
  // }, [search]);

  useEffect(() => {
    if (debouncedSearch !== search) {
      setFilters({ search: debouncedSearch });
    }
  }, [debouncedSearch, search, setFilters]);

  return (
    <>
      <div className='searchBar'>
        <Form
          action=''
          role='search'
          className='searchBar__form'
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className='searchBar__input'
            type='search'
            id='q'
            name='q'
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder='Search items...'
            aria-label='Search pokeItem'
          />
          <button className='searchBar__button' type='button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </Form>
      </div>
    </>
  );
}
