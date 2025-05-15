import MusicToggle from './MusicToggle';
import NavDropdown from './NavDropdown';
import CartToggle from './CartToggle';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <h1 className='title' onClick={() => { navigate('/') }}>
        El Rincón De Coltrane
      </h1>
      <NavDropdown />
      <div className="navButtons navItem">
        <MusicToggle />
        <CartToggle />
      </div>
    </nav>
  );
}