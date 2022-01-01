import * as React from 'react';
import { Link } from 'gatsby';

import { navList, navItem, activeItem } from './Pagination.module.scss';

const Pagination = ({ totalCount, limit }) => {
  const postsPerPage = limit;
  const pathname = typeof window !== 'undefined' ? location.pathname : '/';
  const currentPageNum = pathname.match(/\d.?$/)?.input.match(/\d.?$/) ?? '/';
  const pathPattern =
    pathname === '/' ? '/article' : pathname.replace(/\/\d.?$/, '');
  const range = (start, end) => {
    return [...Array(end - start + 1)].map((_, i) => {
      return start + i;
    });
  };

  return (
    <ul className={navList}>
      {range(1, Math.ceil(totalCount / postsPerPage)).map((n, i) => (
        <li className={navItem} key={i}>
          {(n === 1 && currentPageNum === '/') ||
          n === parseInt(currentPageNum) ? (
            // active pagination block
            <Link
              className={activeItem}
              to={
                n === 1
                  ? pathPattern === '/article'
                    ? '/'
                    : `${pathPattern}`
                  : `${pathPattern}/${n}`
              }
            >
              {n}
            </Link>
          ) : (
            // inactive pagination block
            <Link
              to={
                n === 1
                  ? pathPattern === '/article'
                    ? '/'
                    : `${pathPattern}`
                  : `${pathPattern}/${n}`
              }
            >
              {n}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
