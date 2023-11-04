import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "../styles/blog.module.css"

import { fechaNueva } from '@/utils/helpers'

const Post = ({post}) => {
  const { contenido, imagen, titulo, url, publishedAt } = post
  return (
    <article className={styles.post}>
      
      <Image 
        src={imagen.data.attributes.formats.medium.url}
        alt={`Imagen blog ${titulo}`}
        width={600}
        height={400}
        loading='lazy'
      />
      <div className={styles.contenido}>
        <h3>{titulo}</h3>
        <p className={styles.fecha}>{fechaNueva(publishedAt)}</p>
        <p className={styles.resumen}>{contenido}</p>

        <Link
          href={`/blog/${url}`}  
          className={styles.enlace}
        >
          Ver Post
        </Link>
      </div>
    </article>
  )
}

export default Post