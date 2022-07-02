import { FunctionComponent } from 'react';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Main from '../components/main/Main';
import ArticleSummary from '../components/main/ArticleSummary';
import { bodyContainer, articleContent } from '../styles/article.module.scss';

const BlogPost: FunctionComponent<PageProps<Queries.ArticlePageQuery>> = ({
  data,
}) => {
  if (!data.mdx) {
    throw new Error('failed to retrieve data.');
  }

  const defaultOgp = '/static/ogp-logo.png';
  const ogp = data.mdx.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData
    ?.images as string;

  return (
    <Layout>
      <Seo
        title={data.mdx.frontmatter.title}
        description={data?.mdx?.excerpt}
        image={ogp ?? defaultOgp}
        isArticle={true}
      />
      <Main>
        <ArticleSummary articleInfo={data.mdx} isList={false} />
        <div className={`${bodyContainer} ${articleContent}`}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
      </Main>
    </Layout>
  );
};

export const query = graphql`
  query ArticlePage($slug: String) {
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
          }
        }
        thumbnail_alt
      }
    }
  }
`;

export default BlogPost;
