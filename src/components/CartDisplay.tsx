import { useContext } from "react";
import { CartContext, CartContextInterface, CartItem } from '../context/CartContext';
import { precioARS } from '../utils/currencyFormatter';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

export default function CartDisplay() {
    const { cartList, clearCart, totalItems, updateCartItemQuantity } = useContext(CartContext) as CartContextInterface;
    const navigate = useNavigate();

    // Function to decrease item quantity.
    const handleDecreaseItem = (item: CartItem) => {
        updateCartItemQuantity(item.id, item.quantity - 1);
    }

    const total = cartList.reduce((sum: number, item: CartItem) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return sum + (price * quantity);
    }, 0);

    const handleAddItem = (item: CartItem) => {
        updateCartItemQuantity(item.id, item.quantity + 1);
    };


    return (
        <div className='cartDisplayContainer'>
            <div className="cartTitleContainer">
                <h1>
                    Tu Carrito:
                </h1>
                <div className="clearCartButtonContainer">
                    <Button label="Vaciar Carrito" outlined onClick={clearCart} />
                </div>
            </div>
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
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="cartBottomContainer">
                        <div className="cartBottomText">
                            <h2>Número Total de Items: {totalItems}</h2>
                            <h2>Total: <span>{precioARS(total)}</span></h2>
                        </div>
                    </div>
                </>
            )}
            <div className="confirmPurchaseButtonContainer">
                    <Button
                        label="Volver al Catalogo"
                        onClick={() => navigate('/catalog')}
                    />
                {cartList.length === 0 ? (
                    "" ) : (
                    <Button
                    label="Finalizar Compra"
                    outlined
                    onClick={() => navigate('/confirmPurchase')}
                    /> )
                }
            </div>
        </div>
    );
};
