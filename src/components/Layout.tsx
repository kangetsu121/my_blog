import { FunctionComponent } from 'react';
import Header from './header/Header';
import SideMenu from './sideMenu/SideMenu';
import Footer from './footer/Footer';
import { headerContainer, bodyContents } from './Layout.module.scss';

const Layout: FunctionComponent = ({ children }) => {
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
