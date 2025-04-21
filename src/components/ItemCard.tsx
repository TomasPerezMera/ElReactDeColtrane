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
            <img
                src={`/ElReactDeColtrane/${item.source}`}
                alt={item.name}
                height="250"
                width="250"
                className='albumImage'
            />
        </div>
    );
    const footer = (
        <div className="flex justify-content-between">
            <Link to={`/item/${item.id}`}>
                <Button
                    label="Descripción"
                    className="p-button-text"
                />
            </Link>
            <Button
                label="Agregar al Carrito"
                className="p-button-text"
                onClick={() => {
                    /* Agregar al carrito Logic -- WIP*/
                    console.log(`Agregando ${item.name} al carrito`);
                }}
            />
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
            <div className="botonesContainer">
                <Button
                    label="-"
                    className="p-button-text decrease-btn"
                    data-id="{album.id}"
                    onClick={() => {/* Decrease amount logic -- WIP*/}}
                />
                <Button
                    className="p-button-text"
                    disabled
                    >{item.amount}
                </Button>
                <Button
                    label="+"
                    className="p-button-text increase-btn"
                    data-id="{album.id}"
                    onClick={() => {/* Increase amount logic -- WIP*/}}
                />
            </div>
        </Card>
    );
}