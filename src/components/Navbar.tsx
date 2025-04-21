import '../style/style.css';
import MusicToggle from './MusicToggle';
import NavDropdown from './NavDropdown';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1 className='title'>El Rincón De Coltrane</h1>
      <NavDropdown />
      <MusicToggle />
      <Link to="/cartDisplay" className="cartToggle navItem">
        <button className="cartButton" type="button">
          <img
            id="musicImg" className="musicImg"
            src={`/ElReactDeColtrane/assets/shoppingCart.png`}
            alt={'Shopping Cart Icon'}
          />
        </button>
      </Link>
    </nav>
  );
}