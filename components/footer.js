import Link from "next/link"

import styles from "../styles/Header.module.css"
import footer from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <footer className={footer.footer}>

      <div className={`contenedor ${footer.contenido}`}>
        <nav className={styles.nav}>

          <Link 
            href="/"
            // Scroll para que cuando se cambie a la pagina la pagina haga scroll hasta arriba de la nueva ruta
            scroll={true}
          >Inicio</Link>

          <Link 
            href="/nosotros"
            scroll={true}
          >Nosotros</Link>

          <Link 
            href="/blog"
            scroll={true}
          >Blog</Link>

          <Link 
            href="/tienda"
            scroll={true}
          >Tienda</Link>

        </nav>

        <p>Todos lo derechos reservados {new Date().getFullYear()}</p>
      </div>

    </footer>
  )
}

export default Footer