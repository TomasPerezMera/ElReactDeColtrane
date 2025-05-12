import { useCatalogData } from '../hooks/useCatalogData';
import { precioARS } from '../utils/currencyFormatter';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useContext, useState } from 'react';
import { CartContext, CartContextType, CatalogItem } from '../context/CartContext';
import useToast from '../hooks/useToast';

// This component is used to display the details of a specific item in the catalog.
// It uses the useParams hook to get the id of the item from the URL and fetches the item data from the catalog.

const withLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
};

export default function ItemDetailContainer() {
    // Custom hook to scroll to the top of the page when the component mounts.
    useScrollToTop();

    const { id } = useParams();
    const { catalog, loading, error } = useCatalogData();
    const navigate = useNavigate();
    const { addCartItem } = useContext(CartContext) as CartContextType;
    const showToast = useToast();

    // Initializing item quantity to 0 and its setter.
    const [quantity, setQuantity] = useState(0);

    if (loading) {
        return (
            <div className="loading-container">
                <p>Cargando el detalle...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="error-container">
                <p>Error cargando el detalle: {error.message}</p>
                <Button
                    label="Volver al Catalogo"
                    onClick={() => navigate('/catalog')}
                />
            </div>
        );
    }

    const item = catalog?.find(item => item.id === Number(id)) as CatalogItem | undefined;
    if (!item) return <div>Item no encontrado!</div>;
    if (!catalog || catalog.length === 0) {
        return <div>Loading...</div>;
    }

    const increaseItem = () => {
        if (quantity >= 5) {
            showToast('Alcanzaste el máximo de unidades para este ítem!', 2000);
            return;
        } else {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseItem = () => {
        if (quantity > 0) setQuantity(prev => prev - 1);
        if (quantity === 0) {
            showToast('Alcanzaste el mínimo de unidades para este ítem', 2000);
        }
    };

    const handleAddToCart = () => {
        if (!item.available) {
            showToast("Lo sentimos! Este producto no está disponible.", 3000);
            return;
        }
        if (quantity > 0) {
            addCartItem(item, quantity);
            setQuantity(0);
            showToast("Éxito - tu selección fue añadida al carrito!", 3000);
        } else {
            showToast("Error - seleccioná una cantidad!", 2000);
        }
    };

    return (
        <Card className="itemDetailContainer">
            <div className="imageContainer">
                <img
                    src={`/ElReactDeColtrane/${item.source}`}
                    alt={item.name}
                    onClick ={() => navigate('/catalog')}
                />
            </div>
            <div className="cardBodyContainer">
                <div className="itemDetail">
                    <h1>{item.name}</h1>
                    <p>{precioARS(item.price)}</p>
                    <div className="albumDescription">
                        <span>{withLineBreaks(item.description)}</span>
                    </div>
                </div>
                <div className="buttonsContainer">
                    <div className="itemQuantityButtons">
                        <Button
                            label="-"
                            className="p-button-text decrease-btn"
                            data-id="{album.id}"
                            onClick={decreaseItem}
                        />
                        <button disabled style={{ cursor: "default" }}>
                            {quantity}
                        </button>
                        <Button
                            label="+"
                            className="p-button-text increase-btn"
                            data-id="{album.id}"
                            onClick={increaseItem}
                        />
                    </div>
                    <div className="optionsButtons">
                        <Button
                            label="Volver al Catálogo"
                            aria-label="Mostrar Catálogo"
                            onClick={() => navigate('/catalog')}
                        />
                        <Button
                            label="Agregar al Carrito"
                            aria-label="Agregar al Carrito"
                            className="p-button-text"
                            onClick={() => {
                                handleAddToCart();
                            }}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}