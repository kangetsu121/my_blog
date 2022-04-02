import React from 'react';
import { Link, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout.jsx';
import Seo from '../components/Seo.jsx';
import Main from '../components/main/Main.jsx';
import ArticleSummary from '../components/main/ArticleSummary.jsx';
import Pagination from '../components/pagination/Pagination.jsx';
import { topHeader } from './TagPages.module.scss';
import { readMore } from '../components/main/ArticleSummary.module.scss';

const TagPages = ({ pageContext, data }) => {
  const { tag, limit } = pageContext;
  const tagHeader = `${data.allMdx.totalCount} post${
    data.allMdx.totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout>
      <Seo />
      <Main>
        <h2 className={topHeader}>
          <FontAwesomeIcon icon={faTag} />
          {tagHeader}
        </h2>
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

export default TagPages;

export const pageQuery = graphql`
  query taggedArticleListQuery($tag: String, $skip: Int!, $limit: Int!) {
    allMdx(
      sort: {
        fields: [
          frontmatter___updated_at
          frontmatter___posted_at
          frontmatter___title
        ]
        order: [DESC, DESC, ASC]
      }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
