import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout.jsx';
import Seo from '../components/Seo.jsx';
import Main from '../components/main/Main.jsx';
import ArticleSummary from '../components/main/ArticleSummary.jsx';
import Pagination from '../components/pagination/Pagination.jsx';
import { readMore } from '../components/main/ArticleSummary.module.scss';

const IndexPage = ({ pageContext, data }) => {
  const { limit } = pageContext;
  return (
    <Layout>
      <Seo />
      <Main>
        {data.allMdx.nodes.map((node) => (
          <ArticleSummary key={node.slug} articleInfo={node}>
            <p>{node.excerpt}</p>
            <Link className={readMore} to={`/${node.slug}`}>
              Read More &gt;
            </Link>
          </ArticleSummary>
        ))}
        <Pagination totalCount={data.allMdx.totalCount} limit={limit} />
      </Main>
    </Layout>
  );
};

export const query = graphql`
  query articleListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: {
        fields: [
          frontmatter___updated_at
          frontmatter___posted_at
          frontmatter___title
        ]
        order: [DESC, DESC, ASC]
      }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      nodes {
        slug
        excerpt(truncate: true)
        frontmatter {
          title
          posted_at
          updated_at
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          thumbnail_alt
        }
      }
    }
  }
`;

export default IndexPage;
