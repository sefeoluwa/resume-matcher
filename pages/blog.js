import React from 'react'
import {GraphQLClient, gql} from 'graphql-request'

const graphcms = new GraphQLClient("https://api-ap-south-1.hygraph.com/v2/clm52dmlw34v501tfd8qmeljc/master")

const QUERY = gql`
resumeMatchers {
  resumeMatchers {
    blogPosts
    datePublished
    id
    slug
    title
    updatedAt
    content{
      html
    }
    author{
      name,
      avatar{
        url
      }
    }
    coverPhoto{
      publishedAt{
        createdBy{
          id
        }
        url 
      }
    }
  }
}
`;

export async function getStaticProps(){
    const {resumeMatchers} = await graphcms.request(QUERY)
    return{
        props:{
            resumeMatchers,
        },
        revalidate: 10,
    }
}

function Blog(resumeMatchers) {
  return (
    <div className={StyleSheet.main}>
      {resumeMatchers.map((post) => (
        <BlogCard 
          title={post.title} 
          author={post.author} 
          coverPhoto={post.coverPhoto} 
          key={post.id} 
          datePublished={post.datePublished} 
          slug={post.slug}   
        />
      ))}
    </div>
  )
}

export default Blog