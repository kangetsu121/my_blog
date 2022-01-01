import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Menu from './HeaderMenu.jsx';

import { header, logo, linkText } from './Header.module.scss';

const Header = () => {
  return (
    <header className={header}>
      <Link to="/">
        <h1 className={logo}>
          <StaticImage
            src="../../images/logo.png"
            alt="Kangetsu Blog logo image"
          />
        </h1>
      </Link>
      <Link className={linkText} to="/">
        <h1>Kangetsu Blog</h1>
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
