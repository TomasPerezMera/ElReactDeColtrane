import MusicToggle from './MusicToggle';
import NavDropdown from './NavDropdown';
import CartToggle from './CartToggle';


export default function Navbar() {
  return (
    <nav>
      <h1 className='title'>El Rincón De Coltrane</h1>
      <NavDropdown />
      <div className="navButtons navItem">
        <MusicToggle />
        <CartToggle />
      </div>
    </nav>
  );
}