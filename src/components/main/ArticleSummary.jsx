import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faSyncAlt,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import {
  articleCard,
  thumbnailImage,
  separator,
  dateWrapper,
  date,
  linkText,
  tagLink,
  thumbnailWrapper,
} from './ArticleSummary.module.scss';

const ArticleSummary = ({ articleInfo, children }) => {
  const thumbnail = getImage(articleInfo.frontmatter.thumbnail);
  const tags = articleInfo.frontmatter.tags;

  return (
    <article className={articleCard}>
      <Link className={linkText} to={`/${articleInfo.slug}`}>
        <h2>{articleInfo.frontmatter.title}</h2>
      </Link>
      <hr className={separator} />
      <div className={dateWrapper}>
        <p className={date}>
          <FontAwesomeIcon icon={faCalendar} /> Posted at:{' '}
          {articleInfo.frontmatter.posted_at}
        </p>
        {articleInfo.frontmatter.posted_at !==
          articleInfo.frontmatter.updated_at && (
          <p className={date}>
            <FontAwesomeIcon icon={faSyncAlt} /> Updated at:{' '}
            {articleInfo.frontmatter.updated_at}
          </p>
        )}
      </div>
      {tags.map((tag) => (
        <Link className={tagLink} to={`/tag/${tag}`} key={tag}>
          <FontAwesomeIcon icon={faTag} /> {tag}
        </Link>
      ))}
      <div className={thumbnailWrapper}>
        <GatsbyImage
          className={thumbnailImage}
          image={thumbnail}
          alt={articleInfo.frontmatter.thumbnail_alt}
          objectFit="contain"
        />
      </div>
      {children}
    </article>
  );
};

export default ArticleSummary;
