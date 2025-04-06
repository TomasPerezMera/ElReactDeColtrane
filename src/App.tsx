import './style/style.css'
import Navbar from './components/Navbar';
import WelcomeText from './components/WelcomeText';

export default function App() {
  return (
    <main>
      <header>
          <Navbar />
          <hr></hr>
      </header>
      <WelcomeText />
    </main>
  );
}