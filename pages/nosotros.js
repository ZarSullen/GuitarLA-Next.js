import Head from "next/head"
import Image from "next/image"
import imagen from "../public/img/nosotros.jpg"
import styles from "../styles/Nosotros.module.css"

// Primero se ejecuta la parte del servidor y luego la del cliente, por eso, podemos pasar como prop y conseguir en el componente los datos pasados en props
const Nosotros = ({nosotros}) => {
  return (
    <>
      <Head>
        <title>GuitarLA - nosotros</title>
      </Head>

      <main className="contenedor">
        <h1 className="heading">Nosotros</h1>
        <div className={styles.contenido}>
          
          <Image 
            src={imagen}
            alt="Imagen Sobre Nosotros"
            priority
          />

          <div>
            {nosotros?.contenido}
          </div>

        </div>
      </main>
    </>
  )
}

export default Nosotros


// Con getStaticProps cuando hagas el build del proyecto, lo subes, y despues haces algun cambio en el api, este no se vera reflejado porque es estatico, hasta que hagas otro build, a diferencia de getServerSideProps
export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nosotro?populate=imagen`)
  // Hicimos destructuring y al final cambiamos el nombre de la variable de attributes a nosotros
  const nosotros = await res.json()
  return {
    props: {
      nosotros: nosotros.data.attributes
    }
  }
}