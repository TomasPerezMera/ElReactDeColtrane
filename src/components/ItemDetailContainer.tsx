import { useCatalogData } from '../hooks/useCatalogData';
import { precioARS } from '../utils/currencyFormatter';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const withLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
};

export default function ItemDetailContainer() {
    const { id } = useParams();
    const { catalog } = useCatalogData();

    const item = catalog.find(item => item.id === Number(id));
    if (!item) return <div>Item not found</div>;

    return (
        <Card className="item-detail-container">
            <img
                    src={`/ElReactDeColtrane/${item.source}`}
                    alt={item.name}
                    className="detail-image"
            />
            <div className="item-detail">
                <h1>{item.name}</h1>
                <p>{precioARS(item.price)}</p>
                <div className="albumDescription">
                    <span>{withLineBreaks(item.description)}</span>
                </div>
            </div>
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
            <Button
                label="Agregar al Carrito"
                className="p-button-text"
                onClick={() => {
                    /* Agregar al carrito Logic -- WIP*/
                    console.log(`Agregando ${item.name} al carrito`);
                }}
            />
            <Link to="/catalog">
                <button aria-label="Mostrar Catalogo">Volver al Catalogo</button>
            </Link>
        </Card>
    );
}