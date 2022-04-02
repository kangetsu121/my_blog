import React from 'react';
import SideAboutBlog from './SideAboutBlog.jsx';
import SideAuthorProfile from './SideAuthorProfile.jsx';
import SideSocialList from './SideSocialList.jsx';
import Tags from './Tags.jsx';
import { sideMenu } from './SideMenu.module.scss';

const SideMenu = () => {
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
