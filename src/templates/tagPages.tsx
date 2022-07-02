import { FunctionComponent } from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { FaTag } from 'react-icons/fa';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Main from '../components/main/Main';
import ArticleSummary from '../components/main/ArticleSummary';
import Pagination from '../components/pagination/Pagination';
import { topHeader } from './TagPages.module.scss';
import { readMore } from '../components/main/ArticleSummary.module.scss';

type TagPageContext = {
  tag: string;
  limit: number;
};

const TagPages: FunctionComponent<PageProps<Queries.TagPagesQuery>> = ({
  pageContext,
  data,
}) => {
  // TODO: fix with type-safe code
  const { tag, limit }: TagPageContext = pageContext;
  const tagHeader = `${data.allMdx.totalCount} post${
    data.allMdx.totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout>
      <Seo isArticle={false} />
      <Main>
        <h2 className={topHeader}>
          <FaTag />
          {tagHeader}
        </h2>
        {data.allMdx.nodes.map((node) => (
          // TODO: fix with type-safe code
          <ArticleSummary key={node.slug} articleInfo={node}>
            <p>{node.excerpt}</p>
            {/* TODO: fix with type-safe code */}
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            <Link className={readMore} to={`/${node.slug!}`}>
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
  query TagPages($tag: String, $skip: Int!, $limit: Int!) {
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
