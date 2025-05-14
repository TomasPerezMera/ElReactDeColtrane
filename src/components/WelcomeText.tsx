import { Link } from 'react-router-dom';
import '../style/style.css';

export default function WelcomeText() {
    return (
    <div className="welcomeContainer">
        <div className="welcomeImage">
            <Link to="/catalog">
                <img src="./coltrane.jpg" alt="Coltrane Welcome Image"></img>
            </Link>
        </div>
        <div className="welcomeText">
            <p data-aos="zoom-in-down" data-aos-duration="1500" data-aos-delay="700">
                <b>Hola!</b><br></br>Llegaste al Rincón de Coltrane.
            </p>
            <div className="separator"></div>
            <p data-aos="fade-down" data-aos-duration="1500" data-aos-delay="1700">
                Un pequeño, pero valioso rincón de Internet, donde podrás adquirir algunos de los álbumes más célebres del legendario saxofonista en formato de vinilo.
            </p>
            <p data-aos="fade-down" data-aos-duration="1500" data-aos-delay="2500">
                A continuación, procederemos a listar los ítems disponibles.<br></br><br></br>Debido al stock limitado, se permite un máximo de 5 vinilos por compra - elegí con cuidado!
            </p>
            <Link to="/catalog">
                <button aria-label="Mostrar Catalogo">Mostrar Catálogo</button>
            </Link>
        </div>
    </div>
    );
}