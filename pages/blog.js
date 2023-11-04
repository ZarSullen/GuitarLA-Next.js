import Head from 'next/head'
import React from 'react'
import Post from '@/components/post'

import grid from "../styles/grid.module.css"

const Blog = ({blogs}) => {
  
  return (
    <>
      <Head>
        <title>GuitarLA - blog</title>
        <meta name='description' content='Blog de guitarras, venta de guitarras'/>
      </Head>

      <main className="contenedor">
        <h1 className='heading'>Blog</h1>
        <div className={grid.grid}>
          {blogs?.map( post => (

            <Post 
              key={post.id}
              post={post.attributes}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Blog

export async function getStaticProps () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bogs?populate=imagen`)
  const {data: blogs} = await res.json()
  console.log(blogs)
  return {
    props: {
      blogs
    }
  }
}