import ItemCard from './ItemCard';
import { useCatalogData } from '../hooks/useCatalogData';
import { precioARS } from '../utils/currencyFormatter';

export default function Catalog() {
  const { catalog, loading } = useCatalogData();
  if (loading) return <p>Loading...</p>;
  return (
    <div className='catalogContainer'>
      {catalog.map((item) => (
        <ItemCard key={item.id} item={item} price={precioARS(item.price)} />
      ))}
    </div>
  );
}