import { POKE_API_URL_BASE, POKE_API_LIMIT } from '../configs/config.js';
import { formatName } from '../utils/formatNumber.jsx';

export async function fetchItems() {
  const urls = [];

  for (let i = 1; i <= POKE_API_LIMIT; i++) {
    urls.push(`${POKE_API_URL_BASE}/${i}`);
  }

  const requests = urls.map((url) =>
    fetch(url, { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => ({
        name: formatName(data.name),
        id: data.id,
        imgSrc: data.sprites.default,
        price: data.cost === 0 ? 9999 : data.cost,
        category: data.category.name,
      })),
  );

  return Promise.all(requests);
}
