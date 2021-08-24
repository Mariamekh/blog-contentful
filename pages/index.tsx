/* eslint-disable @next/next/no-typos */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import  { GetStaticProps } from 'next'
import Head from 'next/head'
import { IHome, IHomeFields } from '../@types/generated/contentful'
import client from '../contentful'
import {Container, Row, Col} from 'reactstrap'

export default function Home({home}: {home: IHome}){
 console.log(home)
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
       </Head>

      <main>
        <div
         className='text-center p-5 text-white' 
         style={{
           background:`url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
           minHeight:600
        }}
        >
          <h1 className='mt-5'>{home.fields.title}</h1>
          <div className='mt-5'>
            {documentToReactComponents(home.fields.description!)}
          </div>
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
 