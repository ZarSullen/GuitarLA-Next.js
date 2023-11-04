import { Html, Head, Main, NextScript } from 'next/document'

// En la herarquia Document es el que esta mas arriba de todos, mas que el app
// Document solo hace un unico render que es en el pre-render, por eso no es bueno poner la etiqueta title aquí entonces lo ideal es poner el title en el _app
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Podemos hacer de cierre la etiqueta de Head para agregar etiquetas meta, links, menos la etiqueta title*/}
        <meta name='description' content='GuitarLA - Venta de Guitarras y Blog' />
        <link rel='stylesheet' href='https://necolas.github.io/normalize.css/8.0.1/normalize.css'/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
