import '../style/style.css';
import MusicToggle from './MusicToggle';

export default function Navbar() {
  return (
    <nav>
      <h1 className='title'>El Rincón De Coltrane</h1>
      <MusicToggle />
    </nav>
  );
}