import Image from "next/image"
import Link from "next/link"
import styles from "../styles/guitarras.module.css"

const Guitarra = ({guitarra}) => {
  const {nombre, precio, url, descripcion, imagen} = guitarra.attributes

  return (
    <div className={styles.guitarra}>
    
      <Image 
        src={imagen.data.attributes.formats.medium.url} 
        alt={`Imagen guitarra ${nombre}`}
        width={200}
        height={40}
        loading="lazy"
      />

      <div className={styles.contenido}>
        <h3>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>${precio}</p>
        <Link
          href={`/guitarras/${url}`}
          scroll={true}
          className={styles.enlace}
        >
          Ver Guitarra
        </Link>
      </div>

      
    </div>
  )
}

export default Guitarra