// Added font-awesome as custom script
const existingConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');

module.exports = Object.assign(existingConfig, {
    copyFontawesomeFonts: {
      src: ['./node_modules/font-awesome/fonts/**/*'],
      dest: './www/assets/fonts'
    },
    copyFontawesomeCss: {
      src: ['./node_modules/font-awesome/css/font-awesome.min.css'],
      dest: './www/assets/css'
    },
    copyServiceWorker: {
      src: ['./src/firebase-messaging-sw.js'],
      dest: './www/'
    }
  }
);