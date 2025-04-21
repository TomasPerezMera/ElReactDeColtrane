import './style/style.css'
import Navbar from './components/Navbar'
import WelcomeText from './components/WelcomeText'
import { toast } from 'react-toastify';
import Catalog from './components/Catalog';

function showToast (message: string, time:number) {
  toast(message, {
      style: {
          background: "linear-gradient(to right, #2551a8, #72419d)",
      },
      position: "top-right",
      closeOnClick: false,
      autoClose: time || 2000,
  });
}


export default function App() {
  return (
    <main>
      <header>
        <Navbar />
        <hr />
      </header>
      <WelcomeText />
    </main>
  );
}