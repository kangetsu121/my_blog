import React from 'react';
import Header from './header/Header.jsx';
import SideMenu from './sideMenu/SideMenu.jsx';
import Footer from './footer/Footer.jsx';
import { headerContainer, bodyContents } from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <div className={headerContainer}>
        <Header />
      </div>
      <div className={bodyContents}>
        {children}
        <SideMenu />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
