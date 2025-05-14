import { useContext } from "react";
// START: Ensure updateCartItemQuantity is included in the import
import { CartContext, CartContextType, CartItem } from '../context/CartContext';
// END: Ensure updateCartItemQuantity is included in the import
import { precioARS } from '../utils/currencyFormatter';
import { Button } from 'primereact/button';
import ContactForm from "./ContactForm";

export default function CartDisplay() {
    // START: Destructure the new function from context
    const { cartList, deleteCartItem, clearCart, totalItems, updateCartItemQuantity } = useContext(CartContext) as CartContextType;
    // END: Destructure the new function from context

    // START: Corrected function to decrease item quantity
    const handleDecreaseItem = (item: CartItem) => {
        // Call the new context function to update quantity
        // It will handle removing the item if quantity goes to 0
        updateCartItemQuantity(item.id, item.quantity - 1);
    }
    // END: Corrected function to decrease item quantity

    const total = cartList.reduce((sum: number, item: CartItem) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return sum + (price * quantity);
    }, 0);

    // START: Corrected function to increase item quantity
    const handleAddItem = (item: CartItem) => {
        // Call the new context function to update quantity
        // The context function will handle the global quantity check
        updateCartItemQuantity(item.id, item.quantity + 1);
    };
    // END: Corrected function to increase item quantity


    return (
        <div className='cartDisplayContainer'>
            <h1> Tu Carrito </h1>
            {cartList.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <>
                    <div className="cartItemGrid">
                        <ul className="cartItemList">
                            {cartList.map((item: CartItem) => (
                                <li key={item.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div className="cartItemImage">
                                        <img src={"/ElReactDeColtrane/" + item.source} alt={item.name} />
                                    </div>
                                    <div className="cartItemDetails">
                                        {item.name} - {item.quantity} x {precioARS(item.price)} = {" "}
                                        <strong>{precioARS(item.price * item.quantity)}</strong>
                                    </div>
                                    <div className="cartItemButtons">
                                        <Button label="-" outlined onClick={() => handleDecreaseItem(item)} disabled={item.quantity <= 0} />
                                        <Button disabled outlined>{item.quantity}</Button>
                                        <Button label="+" outlined onClick={() => handleAddItem(item)} />
                                        <Button label="x" outlined onClick={() => deleteCartItem(item.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="clearCartButtonContainer">
                        <Button label="Vaciar Carrito" outlined icon="pi pi-trash" onClick={clearCart} className="p-button-danger" />
                    </div>
                    <div className="cartBottomText">
                        <h2>Total: {precioARS(total)}</h2>
                        <h2>Número de Items: {totalItems}</h2>
                    </div>
                </>
            )}
            <div className="checkoutButtonContainer">
                <Button label="Finalizar Compra" className="p-button-success" />
            </div>
            <div className="contactFormContainer">
                <ContactForm />
            </div>
        </div>
    );
};
