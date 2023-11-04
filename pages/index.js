import Guitarra from "@/components/guitarra"
import styles from "@/styles/grid.module.css"
import Post from "@/components/post"
import Curso from "@/components/curso"


export default function Home({guitarras, blogs, curso}) {
  return (
    <>

    
    <main className="contendor">
        <h1 className="heading">Nuestra Coleccion</h1>
        <div className={styles.grid}>
            {guitarras?.length && guitarras.map( guitarra => (
            <Guitarra 
                key={guitarra.id}
                guitarra={guitarra}
            />
            ))}
        </div>
    </main>

    <Curso 
        curso={curso.attributes}
    />

    <section className="contenedor">
        <h2 className="heading">Blog</h2>
        <div className={styles.grid}>
            {blogs?.map( post => (

            <Post 
                key={post.id}
                post={post.attributes}
            />
            ))}
        </div>
    </section>

</>    
  )
}

export async function getServerSideProps() {
    const urlGuitarras = `${process.env.NEXT_PUBLIC_API_URL}/guitarras?populate=imagen`
    const urlPosts = `${process.env.NEXT_PUBLIC_API_URL}/bogs?populate=imagen`
    const urlCurso = `${process.env.NEXT_PUBLIC_API_URL}/curso?populate=imagen`
    
    //Hacemos el fetch de todo lo que necesitamos usando promise.all para que se haga el fetch al mismo tiempo
    const [resGuitarras, resPosts, resCurso] = await Promise.all([
        fetch(urlGuitarras),
        fetch(urlPosts),
        fetch(urlCurso)
    ]);

    const [{data: guitarras}, {data: blogs}, {data: curso}] = await Promise.all([
        resGuitarras.json(),
        resPosts.json(),
        resCurso.json()

    ])

    return {
        props: {
        guitarras,
        blogs,
        curso
        }
    }
}