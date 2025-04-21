import '../style/style.css';
import MusicToggle from './MusicToggle';
import { Dropdown } from 'primereact/dropdown';

export default function Navbar() {
  return (
    <nav>
      <h1 className='title'>El Rincón De Coltrane</h1>
      <Dropdown
        value="Coltrane"
        options={["Coltrane", "Miles", "Hendrix"]}
        placeholder="Select a band"
        className="p-mb-2 navItem"></Dropdown>
      <MusicToggle />
      <div className="cartToggle navItem">
        <button className="cartButton" type="button">
          <img
            id="musicImg" className="musicImg"
            src={`/ElReactDeColtrane/assets/shoppingCart.png`}
            alt={'Shopping Cart Icon'}
          />
        </button>
      </div>
    </nav>
  );
}