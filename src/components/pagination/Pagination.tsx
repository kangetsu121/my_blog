import { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { navList, navItem, activeItem } from './Pagination.module.scss';

type Props = {
  totalCount: number;
  limit: number;
};

const Pagination: FunctionComponent<Props> = ({ totalCount, limit }) => {
  const postsPerPage = limit;
  const pathname = typeof window !== 'undefined' ? location.pathname : '/';
  const currentPageNum = pathname.match(/\d+$/)?.[0] ?? '/';
  const pathPattern =
    pathname === '/' ? '/article' : pathname.replace(/\/\d+$/, '');
  const range = (start: number, end: number): number[] =>
    Array.from({ length: end - start + 1 }, (_, index) => start + index);

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
