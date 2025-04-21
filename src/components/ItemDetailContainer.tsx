import { useCatalogData } from '../hooks/useCatalogData';
import { precioARS } from '../utils/currencyFormatter';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';

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
            <Link to="/catalog">
                <button aria-label="Mostrar Catalogo">Volver al Catalogo</button>
            </Link>
        </Card>
    );
}