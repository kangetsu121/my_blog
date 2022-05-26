import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { headerMenu, navList, navItem, link } from './HeaderMenu.module.scss';

const HeaderMenu = () => {
  return (
    <nav className={headerMenu}>
      <ul className={navList}>
        <li className={navItem}>
          <Link className={link} to="/rss.xml">
            SUBSCRIBE <FontAwesomeIcon icon={faRss} />
          </Link>
        </li>
        {/* <li className={navItem}>LANGUAGE</li> */}
      </ul>
    </nav>
  );
};

export default HeaderMenu;
