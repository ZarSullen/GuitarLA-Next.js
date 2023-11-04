import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Image from 'next/image'
import Head from 'next/head'
import styles from "../../styles/guitarras.module.css"

const Producto = ({data, agregarACarrito}) => {
    const [cantidad, setCantidad] = useState(0)
    // Agregando el optional chaining pude solucionar el problema de carrito.some dando undefined en el id
    const {precio, url, nombre, descripcion, imagen: {data: {attributes}}} = data[0]?.attributes

    const notificar = () => toast.success("Guitarra agregada a carrito")


    const handleForm = (e) => {
        e.preventDefault()

        if(cantidad === 0) {
            alert("Cantidad no valida")
            return
        };

        // Creamos un objeto con la guitarra seleccionada
        const guitarraSeleccion = {
            precio,
            nombre, 
            imagen: attributes?.url,
            cantidad,
            id: data[0]?.id
        }

        // Funcion que revisa si ya esta en carrito o si es nuevo producto
        agregarACarrito(guitarraSeleccion)
        notificar()

    }
    return (
        <div>

            <Head>
                <title>{`GuitarLA - ${url.toUpperCase()}`}</title>
            </Head>

            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            
            <div className={styles.guitarra}>
                <Image 
                    src={attributes.url} 
                    alt={`Imagen guitarra ${nombre}`}
                    width={600}
                    height={400}
                    priority
                />

                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>
                    
                    <form 
                        className={styles.form}
                        onSubmit={handleForm}
                    >
                        <label htmlFor='cantidad'>Cantidd</label>
                        <select
                            id='cantidad'
                            onChange={e => setCantidad(Number(e.target.value))}
                        >
                            <option value="0">--Selecciona--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <input 
                            type='submit'
                            value="Agregar al Carrito"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Producto
// Si son paginas dinamicas tenemos que hacer use de getStaticPaths
// en Paths solo hacemos fetch a las rutas en este caso la ruta es guitarras
export async function getStaticPaths() {
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras`)
    
    const { data } = await respuesta.json()

    const paths = data.map( guitarra => {
        return {
        params: {
            url: guitarra.attributes.url
        }
        }
    })

    // Los paths se pasan en automatico a getStaticProps
    return {
        paths,
        // Fallback : false sirve para generar una pagina de error si es que la pagina que se entra no existe
        // Si se pone como true nos tocaria a nosotros hacer la validacion dentro del componente
        fallback: false
    }
}

// Se le pasa automaaticamente el parametro de datos 
export async function getStaticProps(datos) {
    const url = datos.params.url // TIene que ser params si usamos getStaticPaths
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    const {data} = await res.json()
    return {
        props: {
        data
        }
    }
}

// export async function getServerSideProps(datos) {
//   const url = datos.query.url
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
//   const {data} = await res.json()
//   return {
//     props: {
//       data
//     }
//   }
// }