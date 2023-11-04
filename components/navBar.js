import Link from 'next/link'
import React from 'react'
import logo from "../public/img/logo.svg"
import Image from 'next/image'
import carritoLogo from "@/public/img/carrito.png"
import styles from "../styles/Header.module.css"
import { useRouter } from 'next/router'

const NavBar = () => {
    const router = useRouter()
    
    return (
        // Los estilos usando module, son como si fueran objetos
        <header className={styles.header}>
        <div className={`contenedor ${styles.barra}`}>
            <Link
            href="/"
            >
            <Image
            // Para mejorar el performance es recomendable poner el width y el heigth - NO es necesario ponerlo lo hace automaticamente solo si la imagen esta localmente estp ayuda a Cumulative Layout Shift (cuando estas en una pagina y derepente todo se mueve porque cargo una imagen)
                src={logo}
                width={300}
                height={40}
                alt='Logo Guitar LA'
                priority
            />
            </Link>

            <nav className={styles.nav}>

            <Link 
                href="/"
                className={router.pathname === "/" ? `${styles.fijo}` : ""}
                // Scroll para que cuando se cambie a la pagina la pagina haga scroll hasta arriba de la nueva ruta
                scroll={true}
            >Inicio</Link>

            <Link 
                href="/nosotros"
                className={router.pathname === "/nosotros" ? `${styles.fijo}` : ""}
                scroll={true}
            >Nosotros</Link>

            <Link 
                href="/blog"
                className={router.pathname === "/blog" ? `${styles.fijo}` : ""}
                scroll={true}
            >Blog</Link>

            <Link 
                href="/tienda"
                className={router.pathname === "/tienda" ? `${styles.fijo}` : ""}
                scroll={true}
            >Tienda</Link>

            <Link
                href={"/carrito"}

            >
                <Image 
                    src={carritoLogo}
                    width={40}
                    height={10}
                    alt='Carrito'
                />
            </Link>
            </nav>
        </div>
        </header>
    )
}

export default NavBar