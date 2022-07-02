import { FunctionComponent } from 'react';
import { sideSection } from './SideAuthorProfile.module.scss';

const SideAuthorProfile: FunctionComponent = () => {
  return (
    <section className={sideSection}>
      <h2>Author</h2>
      <p>大学院修士課程で認知/教育心理学を学びました</p>
      <p>1社目: 保守コンサルタント</p>
      <p>2社目: QAエンジニア</p>
    </section>
  );
};

export default SideAuthorProfile;
