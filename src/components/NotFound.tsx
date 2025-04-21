import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="notFound">
            <section className="title404">
                <h2>404 - Página No Encontrada!</h2>
            </section>
            <section className="body404">
                <p>
                    Parece que la página que estás buscando no existe. Por favor, volvé a la <Link to="/">página principal</Link> y seguí explorando nuestro catálogo.
                </p>
            </section>
            <figure className="coltrane404">
                <Link to="/">
                    <img src="/ElReactDeColtrane/coltrane404.jpg" alt="Coltrane angry at the lack of content..." width="526" height="599" />
                </Link>
            </figure>
        </div>
    )
}