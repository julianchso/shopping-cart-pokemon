import { useState, useEffect } from 'react';
import { POKE_API_URL_BASE, POKE_API_LIMIT } from '../configs/config.js';

import { formatName } from '../utils/formatNumber.jsx';

const useFetchItemDetail = () => {
  const [pokeItemDetail, setPokeItemDetail] = useState([]);
  const pokeItemDetailURL = [];

  function pokeItemDetailURLTemp() {
    for (let i = 1; i <= POKE_API_LIMIT; i++) {
      pokeItemDetailURL.push(`${POKE_API_URL_BASE}/${i}`);
    }
    // console.log(pokeItemDetailURL);
    return pokeItemDetailURL;
  }

  pokeItemDetailURLTemp();

  useEffect(() => {
    const requests = pokeItemDetailURL.map((url) => {
      return fetch(url, { mode: 'cors' })
        .then((response) => {
          return response.json();
        })
        .then((data) => ({
          name: formatName(data.name),
          id: data.id,
          imgSrc: data.sprites.default,
          price: data.cost == 0 ? (data.cost = 9999) : data.cost,
          category: data.category,
        }));
    });

    Promise.all(requests).then((responses) => setPokeItemDetail(responses));
  }, []);

  return pokeItemDetail;
};

export { useFetchItemDetail };
