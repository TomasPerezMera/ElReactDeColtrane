import './style/style.css'
import Navbar from './components/Navbar'
import WelcomeText from './components/WelcomeText'
import Catalog from './components/Catalog';
import CartDisplay from './components/CartDisplay';
import NotFound from './components/NotFound';
import ItemDetailContainer from './components/ItemDetailContainer';
import ConfirmPurchaseDisplay from './components/ConfirmPurchaseDisplay';
import { PrimeReactProvider } from 'primereact/api';
import { HashRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useCatalogData } from './hooks/useCatalogData';
import CartContext from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  useCatalogData();
  return (
    <PrimeReactProvider>
      <CartContext>
        <HashRouter>
          <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                closeOnClick
                theme="dark"
          />
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
              <Route path="/confirmPurchase" element={<ConfirmPurchaseDisplay />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </HashRouter>
      </CartContext>
    </PrimeReactProvider>
  );
}