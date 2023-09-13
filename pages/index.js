import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {GraphQLClient, gql} from 'graphql-request'


const graphcms = new GraphQLClient("https://api-eu-west-2.hygraph.com/v2/clmhynnym0m9701t92eej1o55/master")

const QUERY = gql`
query {
  posts {
    createdAt
    datePublished
    id
    publishedAt
    slug
    title
    updatedAt
    author {
      name
      avatar {
        url
      }
    }
    content {
      html
    }
    coverPhoto {
      createdBy {
        id
      }
      url
    }
  }
}`

export async function getStaticProps(){
  const {posts} = await graphcms.request(QUERY)
  return{
      props:{
          posts,
      },
      revalidate: 10,
  }
}


export default function Home({posts}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      {posts.map((post) => (
        <BlogCard 
          title={post.title} 
          author={post.author} 
          coverPhoto={post.coverPhoto} 
          key={post.id} 
          datePublished={post.datePublished} 
          slug={post.slug}   
        />
        ))}
      </main>

    </div>
  )
}
