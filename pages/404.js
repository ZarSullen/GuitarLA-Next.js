import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const Custom404 = () => {
    const router = useRouter()

  return (
    <div>
        <Head>
            <title>Pagina no encontrada</title>
        </Head>
        
        <p className='error'>Ooh! Pagina no encontrada ._.</p>

        <button
            type='button'
            className='error-enlace'
            onClick={() => router.back()}
        >
            Presiona aquí para regresar
        </button>
    </div>
  )
}

export default Custom404