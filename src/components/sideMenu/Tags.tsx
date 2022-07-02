import { FunctionComponent } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { FaTags } from 'react-icons/fa';
import { tagWrapper, individualTag } from './Tags.module.scss';

const Tags: FunctionComponent = () => {
  const data: Queries.TagsQuery = useStaticQuery(graphql`
    query Tags {
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
        <FaTags style={{ fontSize: 'smaller' }} />
        Tags
      </h2>
      {data.allMdx.group.map(
        (tag) =>
          tag.fieldValue && (
            <Link
              className={individualTag}
              to={`/tag/${tag.fieldValue}`}
              key={tag.fieldValue}
            >
              <span>
                {tag.fieldValue} ({tag.totalCount})
              </span>
            </Link>
          ),
      )}
    </section>
  );
};

export default Tags;
