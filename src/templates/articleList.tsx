import { FunctionComponent } from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Main from '../components/main/Main';
import ArticleSummary from '../components/main/ArticleSummary';
import Pagination from '../components/pagination/Pagination';

const IndexPage: FunctionComponent<PageProps<Queries.ArticleListQuery>> = ({
  pageContext,
  data,
}) => {
  if (!data) {
    throw new Error('failed to receive data');
  }

  // TODO: fix with type-safe code
  const limit: number = pageContext.limit as number;

  return (
    <Layout>
      <Seo title={''} description={''} isArticle={false} />
      <Main>
        {data.allMdx.nodes.map((node) => (
          // TODO: fix with type-safe code
          <ArticleSummary key={node.slug} articleInfo={node} isList={true} />
        ))}
        <Pagination totalCount={data.allMdx.totalCount} limit={limit} />
      </Main>
    </Layout>
  );
};

export const query = graphql`
  query ArticleList($skip: Int!, $limit: Int!) {
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
