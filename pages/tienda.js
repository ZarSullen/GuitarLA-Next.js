import Head from 'next/head'
import React from 'react'
import Guitarra from '@/components/guitarra'
import styles from "../styles/grid.module.css"

const Tienda = ({guitarras}) => {
  return (
    <>
        <Head>
            <title>GuitarLA - Tienda</title>
        </Head>
        
        <main className='contenedor'>
          <h1 className='heading'>Nuestra Coleccion</h1>

          <div className={styles.grid}>
            {guitarras?.length && guitarras.map( guitarra => (
              <Guitarra 
                key={guitarra.id}
                guitarra={guitarra}
              />
            ))}
          </div>
        </main>
    </>
  )
}

export default Tienda

// export async function getStaticProps() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras?populate=imagen`) 
//   const {data: guitarras} = await res.json()
//   return {
//     props: {
//       guitarras
//     }
//   }
// }

// getServerSideProps se hace igual pero lo que hace es diferente

// ServerSideProp sirve cuando tenemos paginas que estan en constante cambio, si hay un cambio en la pagina a diferencia de StaticProp, usando serverSide se actualizaria la imformacion sin tener que hacer otro build

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras?populate=imagen`) 
  const {data: guitarras} = await res.json()
  return {
    props: {
      guitarras
    }
  }
}