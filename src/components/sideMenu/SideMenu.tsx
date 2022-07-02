import { FunctionComponent } from 'react';
import SideAboutBlog from './SideAboutBlog';
import SideAuthorProfile from './SideAuthorProfile';
import SideSocialList from './SideSocialList';
import Tags from './Tags';
import { sideMenu } from './SideMenu.module.scss';

const SideMenu: FunctionComponent = () => {
  return (
    <div className={sideMenu}>
      <SideAboutBlog />
      <SideAuthorProfile />
      <SideSocialList />
      <Tags />
    </div>
  );
};

export default SideMenu;
