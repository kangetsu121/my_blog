/* eslint import/no-unresolved: [2, { ignore: ['@reach/router'] }] */
import { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

type Props = {
  title?: string;
  description?: string;
  image?: string;
  isArticle: boolean;
};

const Seo: FunctionComponent<Props> = ({
  title,
  description,
  image,
  isArticle,
}) => {
  const { pathname } = useLocation();
  const { site }: Queries.SiteQuery = useStaticQuery(
    graphql`
      query Site {
        site {
          siteMetadata {
            lang
            title
            titleTemplate
            description
            siteUrl
            image
            twitterUsername
          }
        }
      }
    `,
  );

  if (!site) {
    throw new Error('Error occurred when querying site information');
  }

  const siteMetadata = site.siteMetadata;
  const pageMetadata = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    image: `${siteMetadata.siteUrl}${image || siteMetadata.image}`,
    url: `${siteMetadata.siteUrl}${pathname}`,
  };

  return (
    <Helmet
      title={pageMetadata.title}
      titleTemplate={siteMetadata.titleTemplate}
    >
      <html lang={siteMetadata.lang} />
      <meta name="description" content={pageMetadata.description} />
      <meta name="image" content={pageMetadata.image} />
      <meta property="og:url" content={pageMetadata.url} />
      {isArticle && <meta property="og:type" content="article" />}
      <meta property="og:title" content={pageMetadata.title} />
      <meta property="og:description" content={pageMetadata.description} />
      <meta property="og:image" content={pageMetadata.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.twitterUsername} />
      <meta name="twitter:title" content={pageMetadata.title} />
      <meta name="twitter:description" content={pageMetadata.description} />
      <meta name="twitter:image" content={pageMetadata.image} />
    </Helmet>
  );
};

export default Seo;
