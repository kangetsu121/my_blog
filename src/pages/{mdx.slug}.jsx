import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout.jsx';
import Seo from '../components/Seo.jsx';
import Main from '../components/main/Main.jsx';
import ArticleSummary from '../components/main/ArticleSummary.jsx';

import { bodyContainer, articleContent } from '../styles/article.module.scss';

const BlogPost = ({ data }) => {
  return (
    <Layout>
      <Seo
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        image={data.mdx.frontmatter.thumbnail.childImageSharp.fluid.src}
        article={true}
      />
      <Main>
        <ArticleSummary articleInfo={data.mdx} />
        <div className={`${bodyContainer} ${articleContent}`}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
      </Main>
    </Layout>
  );
};

export const query = graphql`
  query ($slug: String) {
    mdx(slug: { eq: $slug }) {
      slug
      excerpt(truncate: true)
      body
      frontmatter {
        title
        posted_at
        updated_at
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData
            fluid {
              src
            }
          }
        }
        thumbnail_alt
      }
    }
  }
`;

export default BlogPost;
