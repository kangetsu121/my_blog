import { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import {
  GatsbyImage,
  getImage,
  ImageDataLike,
  StaticImage,
} from 'gatsby-plugin-image';
import { FaCalendar, FaSyncAlt, FaTag } from 'react-icons/fa';

import {
  articleCard,
  thumbnailImage,
  separator,
  dateWrapper,
  date,
  linkText,
  tagLink,
  thumbnailWrapper,
  readMore,
} from './ArticleSummary.module.scss';

type Props = {
  articleInfo: Queries.ArticlePageQuery['mdx'];
  isList: boolean;
};

const ArticleSummary: FunctionComponent<Props> = ({
  articleInfo,
  isList = true,
}) => {
  if (!articleInfo.frontmatter || !articleInfo.slug || !articleInfo.excerpt) {
    throw new Error('failed to get articleInfo');
  }

  const defaultImage = (
    <StaticImage
      className={thumbnailImage}
      src="../../images/logo.png"
      alt="Blog Logo"
      objectFit="contain"
    />
  );
  // TODO: Rewrite this after the issue https://github.com/gatsbyjs/gatsby/issues/35748 is solved
  const thumbnail = getImage(
    articleInfo.frontmatter.thumbnail as unknown as ImageDataLike,
  );
  const thumbnailAlt = articleInfo.frontmatter.thumbnail_alt;
  const tags = articleInfo?.frontmatter?.tags;

  return (
    <article className={articleCard}>
      <Link className={linkText} to={`/${articleInfo.slug}`}>
        <h2>{articleInfo.frontmatter.title}</h2>
      </Link>
      <hr className={separator} />
      <div className={dateWrapper}>
        <p className={date}>
          <FaCalendar /> Posted at: {articleInfo?.frontmatter?.posted_at}
        </p>
        {articleInfo?.frontmatter?.posted_at !==
          articleInfo?.frontmatter?.updated_at && (
          <p className={date}>
            <FaSyncAlt /> Updated at: {articleInfo.frontmatter.updated_at}
          </p>
        )}
      </div>
      {tags?.map(
        (tag) =>
          tag && (
            <Link className={tagLink} to={`/tag/${tag}`} key={tag}>
              <FaTag /> {tag}
            </Link>
          ),
      )}
      <div className={thumbnailWrapper}>
        {thumbnail && thumbnailAlt ? (
          <GatsbyImage
            className={thumbnailImage}
            image={thumbnail}
            alt={thumbnailAlt}
            objectFit="contain"
          />
        ) : (
          defaultImage
        )}
      </div>
      {isList && (
        <>
          <p>{articleInfo.excerpt}</p>
          <Link className={readMore} to={`/${articleInfo.slug}`}>
            Read More &gt;
          </Link>
        </>
      )}
    </article>
  );
};

export default ArticleSummary;
