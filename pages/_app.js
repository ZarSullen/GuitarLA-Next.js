
import '@/styles/globals.css'
import Head from 'next/head'
import { Outfit } from 'next/font/google'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'

// De esta forma cambiamos la fuente, no hace ningun llamado a google solo la trae - a veces tenemos que especificar el peso
const outfit = Outfit({ 
  weight: ['400', '700', "900"], 
  subsets: ['latin'] 
})

// App esta a un escalon arriba de todas las paginas que creemos pero esta abajo del document 
export default function App({ Component, pageProps }) {
    // El gran problema de hidratacion que tenia era por localStorage como este se ejecuta en ambos servidor y cliente, en cliente tenia el arreglo del carrito mientras que en el servidor un arreglo vacio, por eso decia que el problema estaba en el div que iteraba sobre carrito
    const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : []
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(() => {
        if(carrito?.length) {
            const existe = carrito.some( guitarra => guitarra.cantidad === 0 )
            if(existe) {
                const carritoSinCero = carrito.filter((guitarra) => guitarra.cantidad !== 0);
                setCarrito(carritoSinCero);
            }
        }
    }, [carrito])

    useEffect(() => {
        if(carrito?.length) {
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }

        if(typeof window !== "undefined") {
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    }, [carrito])

    const agregarACarrito = guitarra => {
        const existeGuitarra = carrito.some( guitarraState => guitarraState?.id === guitarra?.id) 
        
        if(existeGuitarra) {
            // actualizamos cantidad de guitarra
            const actualizarCantidad = carrito.map( guitarraState => {
                if(guitarraState.id === guitarra.id) {
                    guitarraState.cantidad = guitarra.cantidad
                } 
                return guitarraState
            })
            setCarrito(actualizarCantidad)
            return
        } else {
            // Añadimos la guitarra al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    const modificarCantidad = (value, id) => {
        const nuevaCantidad = carrito.map( producto => {
            if(producto.id === id) {
                producto.cantidad = value
            }
            return producto
        })

        setCarrito(nuevaCantidad)

    }
    const eliminarGuitarra = id => {
        const confirmDestroy = confirm("¿Seguro qué deseas eliminar esta guitarra?")

        if(confirmDestroy) {
            const destroy = carrito.filter( guitarra => guitarra.id !== id)
            setCarrito(destroy)
        }

    }


    // if(typeof window ===)
  return (
    <>
      {/* Lo hice de esta manera para no crear una etiqueta main extra */}
      <style jsx global>{`
        html {
          font-family: ${outfit.style.fontFamily};
        }
      `}</style>

      <Head>
        <title>GuitarLA - inicio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <Layout>
        <Component {...pageProps} 
            agregarACarrito={agregarACarrito}
            carrito={carrito}
            modificarCantidad={modificarCantidad}
            eliminarGuitarra={eliminarGuitarra}
        />
      </Layout>
    </>
  )
}
