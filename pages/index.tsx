/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-typos */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  IArticleFields,
  IArticle,
  IHome,
  IHomeFields
} from '../@types/generated/contentful';
import client from '../contentful';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import Link from 'next/link';

export default function Home({
  home,
  articles
}: {
  home: IHome;
  articles: IArticle[];
}) {
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
      </Head>
      <main>
        <div
          className="text-center p-5 text-white"
          style={{
            background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
            minHeight: 600
          }}
        >
          <h1 className="mt-5">{home.fields.title}</h1>
          <div className="mt-5">
            {documentToReactComponents(home.fields.description!)}
          </div>
        </div>

        <Container className="pt-5">
          <Row>
            {articles.map(article => {
              return (
                <Col sm={4} key={article.fields.slug}>
                  <Card body>
                    <CardTitle tag="h5">{article.fields.title}</CardTitle>
                    <CardText>{article.fields.description}</CardText>
                    <Link href={`/articles/${article.fields.slug}`}>
                      <Button> {article.fields.action}</Button>
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomeFields>({
    content_type: 'home',
    limit: 1
  });

  const article = await client.getEntries<IArticleFields>({
    content_type: 'article'
  });

  const [homePage] = home.items;

  return {
    props: {
      home: homePage,
      articles: article.items
    },
    revalidate: 3600
  };
};
