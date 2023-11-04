import { useState, useEffect } from "react";

import Image from "next/image"

import styles from "@/styles/carrito.module.css"
import guitarras from "@/styles/guitarras.module.css"

const Carrito = ({carrito, modificarCantidad, eliminarGuitarra}) => {
    
    
    const [mounted, setMounted] = useState(false);
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if(carrito.length) {
            const total = carrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0)
            setSubTotal(total)
        }
    }, [carrito])

    if(!mounted) return <></>;



    return (
        <main className='contenedor'>

            <h1 className='heading'>Carrito de Compras</h1>

            <div className={styles.grid}>

                <div className={styles.carrito}>

                    <h2>Articulos</h2>
                    
                    {carrito.length === 0 ? "Carrito Vacio" : (
                    carrito.map( producto => (
                    <div key={producto.id} className={styles.producto}>
                        
                        <Image 
                            width={200}
                            height={480}
                            src={producto.imagen}
                            alt={producto.nombre}
                        />
                        
                        <div className={styles.contenido}>

                            <p className={styles.nombre}>{producto.nombre}</p>
                            <p className={styles.precio}>${producto.precio}</p>
                            <p className={styles.subtotal}>Subtotal: <span>${producto.cantidad * producto.precio}</span></p>

                            <div 
                                className={`${guitarras.form} ${styles.form}`}
                            >
                                <label htmlFor='cantidad'>Cambiar Cantidad: </label>
                                <select id='cantidad'
                                    onChange={e => modificarCantidad(Number(e.target.value), producto.id)}
                                    value={producto.cantidad}
                                >
                                    <option value="0">--Selecciona--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>



                        </div>

                        <button
                            onClick={() => eliminarGuitarra(producto.id)}
                        >X</button>

                    </div>
                    )))}
                    
                </div>

                <aside className={styles.resumen}>
                    <h3>Resumen del Pedido</h3>
                    <p>Total a pagar: ${subTotal}</p>
                </aside>

            </div>

        </main>
    )
}

export default Carrito