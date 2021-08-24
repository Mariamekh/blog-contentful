/* eslint-disable @next/next/no-typos */
import  { GetStaticProps } from 'next'
import Head from 'next/head'
 

export default function Home({title}: {title:string}){
  return (
    <div>
      <Head>
        <title>{title}</title>
       </Head>

      <main>
        <h1>{title}</h1>
     </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  return {
    props:{
      title:'My Blog'
    }
  }
}
 