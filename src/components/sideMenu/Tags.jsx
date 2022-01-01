import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { tagWrapper, individualTag } from './Tags.module.scss';

const Tags = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: frontmatter___tags) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  return (
    <section className={tagWrapper}>
      <h2>
        <FontAwesomeIcon icon={faTags} style={{ fontSize: 'smaller' }} />
        Tags
      </h2>
      {data.allMdx.group.map((tag) => (
        <Link
          className={individualTag}
          to={`/tag/${tag.fieldValue}`}
          key={tag.fieldValue}
        >
          <span>
            {tag.fieldValue} ({tag.totalCount})
          </span>
        </Link>
      ))}
    </section>
  );
};

export default Tags;
