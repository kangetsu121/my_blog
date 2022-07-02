import type { GatsbyConfig } from 'gatsby';

type Site = {
  readonly siteMetadata: {
    readonly title: string;
    readonly description: string;
    readonly siteUrl: string;
    readonly site_url: string;
  };
};
type AllMdx = {
  readonly totalCount: number;
  readonly nodes: ReadonlyArray<{
    readonly excerpt: string;
    readonly html: string;
    readonly slug: string;
    readonly frontmatter: {
      readonly title: string;
      readonly posted_at: string;
    };
  }>;
};

const config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  graphqlTypegen: true,
  siteMetadata: {
    lang: 'ja',
    title: 'Kangetsu Blog',
    titleTemplate: '%s',
    description: '学習メモや読書記録など',
    siteUrl: 'https://kangetsu121.work',
    image: '/logo.png',
    twitterUsername: '@kangetsu_121',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
        },
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: `${__dirname}/src/images/favicon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              withWebp: true,
              withAvif: true,
            },
          },
          'gatsby-remark-prismjs-title',
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'article',
        path: `${__dirname}/article/`,
      },
      __key: 'article',
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          query SiteData {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMdx },
            }: {
              query: { site: Site; allMdx: AllMdx };
            }) => {
              return allMdx.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.posted_at,
                  url: site.siteMetadata.siteUrl + node.slug,
                  guid: site.siteMetadata.siteUrl + node.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              query AllMdxData {
                allMdx(
                  sort: {
                    fields: [frontmatter___updated_at, frontmatter___posted_at]
                    order: [DESC, DESC]
                  }
                ) {
                  nodes {
                    excerpt(truncate: true)
                    html
                    slug
                    frontmatter {
                      title
                      posted_at
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Kangetsu Blog RSS Feed',
          },
        ],
      },
    },
  ],
};

export default config;
