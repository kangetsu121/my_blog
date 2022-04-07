import 'sanitize.css';
import './src/styles/global.scss';
import 'prismjs/themes/prism-tomorrow.css';

// See https://github.com/FortAwesome/react-fontawesome/issues/134#issuecomment-471940596
// This ensures that the icon CSS is loaded immediately before attempting to render icons
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;
