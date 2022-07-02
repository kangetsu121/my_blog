import { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { FaRss } from 'react-icons/fa';
import { headerMenu, navList, navItem, link } from './HeaderMenu.module.scss';

const HeaderMenu: FunctionComponent = () => {
  return (
    <nav className={headerMenu}>
      <ul className={navList}>
        <li className={navItem}>
          <Link className={link} to="/rss.xml">
            SUBSCRIBE <FaRss />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;
