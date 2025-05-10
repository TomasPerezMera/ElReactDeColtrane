import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { precioARS } from '../utils/currencyFormatter';
import { Link } from 'react-router-dom';
import { CatalogItem } from '../context/CartContext';

// This component is used to display a card for each item in the catalog.

interface ItemCardProps {
    item: CatalogItem;
    price: string;
}

export default function ItemCard({ item }: ItemCardProps) {
    const header = (
        <div className="cardImage">
            <Link to={`/item/${item.id}`}>
                <img
                    src={`/ElReactDeColtrane/${item.source}`}
                    alt={item.name}
                    height="250"
                    width="250"
                    className='albumImage'
                />
            </Link>
        </div>
    );
    const footer = (
        <div className="flex justify-content-between">
            <Link to={`/item/${item.id}`}>
                <Button
                    label="Ver Más"
                    className="p-button-text"
                />
            </Link>
        </div>
    );
    return (
        <Card
            title={item.name}
            subTitle={precioARS(item.price)}
            footer={footer}
            header={header}
            className="catalogItem"
        >
        </Card>
    );
}