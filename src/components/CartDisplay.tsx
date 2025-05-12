import { useContext } from "react";
import { CartContext, CartContextType, CartItem } from '../context/CartContext';
import { precioARS } from '../utils/currencyFormatter';
import { Button } from 'primereact/button';
import ContactForm from "./ContactForm";



export default function CartDisplay() {
    const { cartList, deleteCartItem, addCartItem, clearCart } = useContext(CartContext) as CartContextType;

    const handleDecreaseItem = (item: CartItem) => {
        if (item.quantity > 1) {
            addCartItem(item, item.quantity - 1);
        } else {
            deleteCartItem(item.id);
        };
    }
    const total = cartList.reduce((sum: number, item: CartItem) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return sum + (price * quantity);
    }, 0);

    const handleAddItem = (item: CartItem) => {
        if (item.quantity <= 5) {
            addCartItem(item, item.quantity + 1);
        }
    };

    return (
        <div className='cartDisplayContainer'>
            <h1> Tu Carrito: </h1>
            {cartList.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <div className="cartItemContainer">
                        <ul>
                            {cartList.map((item: CartItem) => (
                                <li key={item.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div className="cartItemDetails">
                                        <img src={"/ElReactDeColtrane/" + item.source} alt={item.name} />
                                        {item.name} - {item.quantity} x {precioARS(item.price)} = {" "}
                                        <strong>{precioARS(item.price * item.quantity)}</strong>
                                    </div>
                                    <div className="cartItemButtons">
                                        <Button icon="pi pi-minus" outlined onClick={() => handleDecreaseItem(item)} className="p-button-rounded p-button-text" disabled={item.quantity <= 0} />
                                        <Button icon="pi pi-plus" outlined onClick={() => handleAddItem(item)} className="p-button-rounded p-button-text" style={{ marginRight: '10px' }} />
                                        <Button icon="pi pi-trash" outlined onClick={() => deleteCartItem(item.id)} className="p-button-rounded p-button-danger p-button-text" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="clearCartButtonContainer">
                        <Button label="Vaciar Carrito" outlined icon="pi pi-trash" onClick={clearCart} className="p-button-danger" />
                    </div>
                    <h2>Total: {precioARS(total)}</h2>
                </>
            )}
            <div className="checkoutButtonContainer">
                <Button label="Finalizar Compra" icon="pi pi-check" className="p-button-success" />
            </div>
            <div className="contactFormContainer">
                <ContactForm />
            </div>
        </div>
    );
};