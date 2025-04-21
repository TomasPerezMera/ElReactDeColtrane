import '../style/style.css';

export default function WelcomeText() {
    return (
    <div className="welcome">
        <p data-aos="zoom-in-down" data-aos-duration="1500" data-aos-delay="700">
            <b>Hola!</b><br></br>Llegaste al Rincón de Coltrane.
        </p>
        <div className="separator"></div>
        <p data-aos="fade-down" data-aos-duration="1500" data-aos-delay="1800">
            Un pequeño, pero valioso rincón de Internet, donde podrás adquirir algunos de los álbumes más célebres del legendario saxofonista en formato de vinilo.
        </p>
        <div className="separator"></div>
        <p data-aos="fade-down" data-aos-duration="1500" data-aos-delay="3000">
            A continuación, procederemos a listar los ítems disponibles.<br></br><br></br>Debido al stock limitado, se permite un máximo de 5 vinilos por compra - elegí con cuidado!
        </p>
        <button>Mostrar Catalogo</button>
    </div>
    );
}