import React from 'react';
import { sideSection } from './SideAboutBlog.module.scss';

const SideAboutBlog = () => {
  return (
    <section className={sideSection}>
      <h2>About This Blog</h2>
      <p>
        <b>Blog</b>: 学習メモや読書記録など
      </p>
      <p>
        <b>Zenn</b>: 体系的にまとめたもの
      </p>
      <p>
        <b>Qiita</b>: 過去記事
      </p>
      <p>
        <b>はてなブログ</b>: 過去記事
      </p>
      <br />
      <p>ご意見・ご質問などは Twitter にお送りください</p>
    </section>
  );
};

export default SideAboutBlog;
