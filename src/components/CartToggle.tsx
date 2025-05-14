import { Link } from "react-router-dom";
import { Badge } from 'primereact/badge';
import { useContext } from 'react';
import { CartContext, CartContextInterface } from "../context/CartContext";

export default function CartToggle() {
    const { totalItems } = useContext(CartContext) as CartContextInterface;
    return (
        <>
            <Link to="/cartDisplay" className="cartToggle">
                <button className="cartToggleButton p-overlay-badge p-badge-info" type="button">
                    <Badge
                        value={totalItems != 0 ? totalItems : null}
                        severity="info"
                        style={{ fontSize: '1.5rem' }} >
                    </Badge>
                    <img
                        id="musicImg" className="musicImg"
                        src={`/ElReactDeColtrane/assets/shoppingCart.png`}
                        alt={'Shopping Cart Icon'}
                    />
                </button>
            </Link>
        </>
    );
}