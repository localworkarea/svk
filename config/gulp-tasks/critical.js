import { stream as critical } from 'critical';
import log from 'fancy-log';

export const criticalCss = () => {
  return app.gulp
    .src('dist/*.html') // финальный HTML
    .pipe(
      critical({
        base: 'dist/', // папка с CSS
        inline: true,  // сразу вставлять критический CSS
        css: [
          'dist/css/style.css'
        ],
        width: 480,
        height: 900,
        // minify: true
      })
    )
    .on('error', (err) => {
      log.error('Critical CSS error:', err.message);
    })
    .pipe(app.gulp.dest('dist'));
};
