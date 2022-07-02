import { FunctionComponent } from 'react';
import { mainArticles } from './Main.module.scss';

const Main: FunctionComponent = ({ children }) => {
  return <main className={mainArticles}>{children}</main>;
};

export default Main;
