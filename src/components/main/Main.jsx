import * as React from 'react';

import { mainArticles } from './Main.module.scss';

const Main = ({ children }) => {
  return <main className={mainArticles}>{children}</main>;
};

export default Main;
