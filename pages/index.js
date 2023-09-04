import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {GraphQLClient, gql} from 'graphql-request'

const graphcms = new GraphQLClient("https://api-ap-south-1.hygraph.com/v2/clm52dmlw34v501tfd8qmeljc/master")

const QUERY = gql`
ResumeMatchers {
  resumeMatchers {
    blogPosts
    createdAt
    datePublished
    id
    publishedAt
    title
    updatedAt
    content{
      html
    }
  }
}

`

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
       
      </main>

    </div>
  )
}
