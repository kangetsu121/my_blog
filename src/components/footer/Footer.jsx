import { Link } from 'gatsby';
import { footer, link, navList } from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={footer}>
      <ul className={navList}>
        <li>
          <Link className={link} to="/documents/disclaimer">
            免責事項
          </Link>
        </li>
        <li>
          <Link className={link} to="/documents/privacy-policy">
            Privacy Policy
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
