import path from 'path';
import type { GatsbyNode } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`
    type Site {
      siteMetadata: SiteMetadata!
    }

    type SiteMetadata {
      lang: String!
      title: String!
      titleTemplate: String!
      description: String!
      siteUrl: String!
      image: String!
      twitterUsername: String!
    }

    type ArticlePageQuery {
      mdx: Mdx!
    }

    type Mdx {
      frontmatter: Frontmatter!
    }

    type Frontmatter {
      title: String!
      posted_at: String!
      updated_at: String!
    }
  `);
  };

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const articleListTemplate = path.resolve('src/templates/articleList.tsx');
  const tagTemplate = path.resolve('src/templates/tagPages.tsx');

  const result: { errors?: unknown; data?: Queries.GatsbyNodeQuery } =
    await graphql(`
      query GatsbyNode {
        postRemark: allMdx {
          nodes {
            slug
            frontmatter {
              tags
            }
          }
        }
        tagsGroup: allMdx {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `);

  // handle errors
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');

    return;
  }

  const postsPerPage = 10;

  // Make article pages
  const posts = result?.data?.postRemark.nodes;
  const totalPageNum = Math.ceil(posts?.length ?? 1 / postsPerPage);
  Array.from({ length: totalPageNum }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/article/${i + 1}`,
      component: articleListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPageNum: totalPageNum,
        currentPage: i + 1,
      },
    });
  });

  // Make tag pages
  const tags = result?.data?.tagsGroup.group;
  tags?.forEach((tag) => {
    const totalPageNum = Math.ceil(tag.totalCount / postsPerPage);
    Array.from({ length: totalPageNum }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/tag/${tag?.fieldValue ?? 'default'}/`
            : `/tag/${tag?.fieldValue ?? 'default'}/${i + 1}`,
        component: tagTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          tag: tag.fieldValue,
          totalPageNum: totalPageNum,
          currentPage: i + 1,
        },
      });
    });
  });
};
