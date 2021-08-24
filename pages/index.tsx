/* eslint-disable @next/next/no-typos */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import  { GetStaticProps } from 'next'
import Head from 'next/head'
import { IHome, IHomeFields } from '../@types/generated/contentful'
import client from '../contentful'
 

export default function Home({home}: {home: IHome}){
 console.log(home)
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
       </Head>

      <main>
        <h1>{home.fields.title}</h1>
        <div>
          {documentToReactComponents(home.fields.description!)}
        </div>
     </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
  const home = await client.getEntries<IHomeFields>({
    content_type: 'home',
    limit:1
  })
 
  const [homePage] = home.items;

  return {
    props:{
       home: homePage,
    },
    revalidate: 3600
  }
}
 