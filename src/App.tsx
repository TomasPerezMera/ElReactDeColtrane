import './style/style.css'
import Navbar from './components/Navbar';

export default function App() {
  return (
    <main>
      <header>
          <h1 className='title'>El Rincón De Coltrane</h1>
          <hr></hr>
          <Navbar />
      </header>
    </main>
  );
}