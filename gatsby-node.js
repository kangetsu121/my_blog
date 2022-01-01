const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const articleListTemplate = path.resolve('./src/templates/articleList.jsx');
  const tagTemplate = path.resolve('src/templates/tagPages.jsx');

  const result = await graphql(`
    {
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
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const postsPerPage = 10;

  // Make article pages
  const posts = result.data.postRemark.nodes;
  const totalPageNum = Math.ceil(posts.length / postsPerPage);
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
  const tags = result.data.tagsGroup.group;
  tags.forEach((tag) => {
    const totalPageNum = Math.ceil(tag.totalCount / postsPerPage);
    Array.from({ length: totalPageNum }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/tag/${tag.fieldValue}/`
            : `/tag/${tag.fieldValue}/${i + 1}`,
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
