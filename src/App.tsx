import './style/style.css'
import Navbar from './components/Navbar'
import WelcomeText from './components/WelcomeText'
import Catalog from './components/Catalog';
import CartDisplay from './components/CartDisplay';
import NotFound from './components/NotFound';
import ItemDetailContainer from './components/ItemDetailContainer';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCatalogData } from './hooks/useCatalogData';


export default function App() {
  useCatalogData();
  return (
    <PrimeReactProvider>
      <BrowserRouter basename="/ElReactDeColtrane">
        <main>
          <header>
            <Navbar />
            <hr />
          </header>
          <Routes>
            <Route path="/" element={<WelcomeText />} />
            <Route path="/home" element={<WelcomeText />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cartDisplay" element={<CartDisplay />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}