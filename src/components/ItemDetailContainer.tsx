import { useCatalogData } from '../hooks/useCatalogData';
import { precioARS } from '../utils/currencyFormatter';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const item = catalog.find(item => item.id === Number(id));
    if (!item) return <div>Item not found</div>;

    return (
        <Card className="itemDetailContainer">
            <img
                    src={`/ElReactDeColtrane/${item.source}`}
                    alt={item.name}
                    className="detail-image"
            />
            <div className="itemDetail">
                <h1>{item.name}</h1>
                <p>{precioARS(item.price)}</p>
                <div className="albumDescription">
                    <span>{withLineBreaks(item.description)}</span>
                </div>
            </div>
            <div className="itemAmountContainer">
                <Button
                    label="-"
                    className="p-button-text decrease-btn"
                    data-id="{album.id}"
                    onClick={() => {/* Decrease amount logic -- WIP*/}}
                />
                <Button
                    className="p-button-text"
                    disabled
                    value={item.amount}
                    >
                </Button>
                <Button
                    label="+"
                    className="p-button-text increase-btn"
                    data-id="{album.id}"
                    onClick={() => {/* Increase amount logic -- WIP*/}}
                />
            </div>
            <div className="optionsButtons">

                <Button
                    label="Volver al Catalogo"
                    aria-label="Mostrar Catalogo"
                    onClick={() => navigate('/catalog')}
                />
                <Button
                    label="Agregar al Carrito"
                    aria-label="Agregar al Carrito"
                    className="p-button-text"
                    onClick={() => {
                        /* Agregar al carrito Logic -- WIP*/
                        console.log(`Agregando ${item.name} al carrito`);
                    }}
                />
            </div>
        </Card>
    );
}