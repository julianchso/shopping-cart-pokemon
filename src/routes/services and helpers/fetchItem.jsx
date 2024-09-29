import { useEffect, useState } from 'react';

function FetchItemName() {
  const [pokeItem, setPokeItem] = useState([]);
  const limit = 10;
  const url = `https://pokeapi.co/api/v2/item?limit=${limit}&offset=0`;
  // console.log(pokeItem);

  // fetch item name
  async function fetchData() {
    await fetch(url, { mode: 'cors' })
      .then((response) => response.json())
      .then((data) => {
        setPokeItem(data.results);
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return pokeItem;
}

function FetchItemPrice(itemName) {
  const [pokeItemPrice, setPokeItemPrice] = useState([]);
  const url = `https://pokeapi.co/api/v2/item/${itemName}`;

  async function fetchItemPrice() {
    await fetch(url, { mode: 'cors' })
      .then((response) => response.json())
      .then((data) => {
        setPokeItemPrice(data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchItemPrice();
  }, []);

  return pokeItemPrice;
}

export { FetchItemName, FetchItemPrice };
