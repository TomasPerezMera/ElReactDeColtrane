import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { precioARS } from '../utils/currencyFormatter';
import { Link } from 'react-router-dom';


interface CatalogItem {
    id: number;
    name: string;
    year: number;
    price: number;
    amount: number;
    source: string;
    description: string;
}

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