import { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

interface CatalogItem {
  id: number;
  name: string;
  year: number;
  price: number;
  amount: number;
  source: string;
  description: string;
}

let precioARS = (precio: number) => {
  return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
  }).format(precio);
}

export default function Catalog() {
  const [catalogData, setCatalogData] = useState<CatalogItem[]>([]);

  useEffect(() => {
    fetch('/ElReactDeColtrane/catalog.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: CatalogItem[]) => setCatalogData(data))
      .catch((error) => console.error('Error fetching catalog:', error));
  }, []);

  return (
    <div className='catalogContainer'>
      {catalogData.map((item) => (
        <ItemCard key={item.id} item={item} precioARS={precioARS} />
      ))}
    </div>
  );
}