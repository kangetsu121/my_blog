import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { sideSection, navList, navItem } from './SideSocialList.module.scss';

const SideSocialList = () => {
  return (
    <section className={sideSection}>
      <h2>Links</h2>
      <ul className={navList}>
        <li className={navItem}>
          <a
            href="https://twitter.com/kangetsu_121"
            target="_blank"
            rel="noreferrer"
          >
            <StaticImage
              src="../../images/twitter-icon.png"
              alt="Twitter"
              height={24}
            />
          </a>
        </li>
        <li className={navItem}>
          <a
            href="https://zenn.dev/kangetsu_121"
            target="_blank"
            rel="noreferrer"
          >
            <StaticImage
              src="../../images/zenn-logo.png"
              alt="Zenn"
              height={24}
            />
          </a>
        </li>
        <li className={navItem}>
          <a
            href="https://qiita.com/kangetsu121"
            target="_blank"
            rel="noreferrer"
          >
            <StaticImage
              src="../../images/qiita-logo-background-color.png"
              alt="Qiita"
              height={24}
              style={{ minHeight: '16px' }}
            />
          </a>
        </li>
        <li className={navItem}>
          <a
            href="https://github.com/kangetsu121"
            target="_blank"
            rel="noreferrer"
          >
            <StaticImage
              src="../../images/GitHub-Mark-64px.png"
              alt="GitHub"
              height={24}
            />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default SideSocialList;
