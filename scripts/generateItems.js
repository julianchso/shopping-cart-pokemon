import fs from 'fs/promises';
import { POKE_API_URL_BASE } from '../src/configs/config.js';

const LIMIT = 2230;

async function generateItems() {
  const urls = [];

  for (let i = 1; i <= LIMIT; i++) {
    urls.push(`${POKE_API_URL_BASE}/${i}`);
  }

  const requests = urls.map(async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      return {
        id: data.id,
        name: data.name,
        price: data.cost === 0 ? 9999 : data.cost,
        category: data.category?.name ?? 'unknown',
        imgSrc: data.sprites.default ?? null,
      };
    } catch (err) {
      console.log(err);
      console.error('Error fetching', url);
      return null;
    }
  });

  const items = await Promise.all(requests);

  const cleanItems = items.filter(Boolean);

  await fs.writeFile('./public/data/items.json', JSON.stringify(cleanItems, null, 2));

  console.log(`Saved ${cleanItems.length} items.`);
}

generateItems();
