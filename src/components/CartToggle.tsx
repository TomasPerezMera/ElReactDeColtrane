import { Link } from "react-router-dom";

export default function CartToggle() {
    return (
        <>
            <Link to="/cartDisplay" className="cartToggle">
                <button className="cartToggleButton" type="button">
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