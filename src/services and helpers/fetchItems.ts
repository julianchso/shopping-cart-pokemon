import { POKE_API_URL_BASE, POKE_API_LIMIT } from '../configs/config.js';
import { formatName } from '../utils/formatNumber.jsx';

export async function fetchItems() {
  const urls = [];

  for (let i = 1; i <= POKE_API_LIMIT; i++) {
    urls.push(`${POKE_API_URL_BASE}/${i}`);
  }

  const requests = urls.map(async (url) => {
    try {
      const res = await fetch(url, { mode: 'cors' });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      const formatted = {
        name: formatName(data.name),
        id: data.id,
        imgSrc: data.sprites.default,
        price: data.cost === 0 ? 9999 : data.cost,
        category: data.category.name,
      };

      return formatted;
    } catch (err) {
      console.error(`Error fetch ${url}:`, err);
      return null;
    }
  });

  const results = await Promise.all(requests);

  return results.filter(Boolean);
}
