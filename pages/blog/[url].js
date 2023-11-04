import React from 'react'
import styles from "@/styles/blog.module.css"
import Image from 'next/image'
import Head from 'next/head'
import { fechaNueva } from '@/utils/helpers'

// post el prop que pasamos desde getStaticProps
const Post = ({post}) => {
  
  const { contenido, imagen, titulo, url, publishedAt } = post[0].attributes

  return (
    <article className={`contenedor ${styles.post}`}>
      
      <Head>
        <title>GuitarLA - {titulo}</title>
      </Head>
    
      <h3 className='heading'>{titulo}</h3>
      <Image 
        src={imagen.data.attributes.url}
        alt={`Imagen blog ${titulo}`}
        width={800}
        height={400}
        priority
      />
      <div className={styles.contenido}>
        <p className={styles.fecha}>{fechaNueva(publishedAt)}</p>
        <p className={styles.texto}>{contenido}</p>
      </div>
    </article>
  )
}

export default Post
// Cuando usamos getStaticProps en una pagina dinamica esta necesita definir la lista de paths que se generaran estaticamente, usando getStaticPaths de una pagina dinamica next.js va a hacer un pre-render estatico de todos los paths especificados
export async function getStaticPaths() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bogs`)
  const {data} = await respuesta.json()

  const paths = data.map( post => {
    return {
      params: {
        // Como en el la pagina dinamica definimos el [url] como la variable, ese es el path que tenemos que definir aqui
        url: post.attributes.url
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

// Usando getStaticProps lo que conseguimos es el post individual de la pagina dinamica pero para poder funcionar necesitamos los paths para eso usamos getStaticPaths
export async function getStaticProps(datos) {
  const url = datos.params.url // TIene que ser params si usamos getStaticPaths
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bogs?filters[url]=${url}&populate=imagen`)
  const {data: post} = await res.json()
  // Estos props es la informacion del post que usaremos en el componente
  return {
    props: {
      post
    }
  }
}