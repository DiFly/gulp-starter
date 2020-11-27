# My simple starter project with gulp

## How work

First, need execute command `git clone GitUrlOfThisProject`. Next, go into folder, and use command `npm install`.

After all packages was instaled, you can use next command to work with project:

- `gulp` or `gulp serve` to start local server with live reload
- `gulp build` to create build witout starting server (show out files in folder `dist`)
- `gulp clean` to clean `dist` folder

If you want change tasks or change file path, you can search this functions and const `path` in file `gulpfile.js`.

### Using libs

[del](https://www.npmjs.com/package/del),
[gulp-sass](https://www.npmjs.com/package/gulp-sass),
[gulp-rename](https://www.npmjs.com/package/gulp-rename),
[gulp-concat](https://github.com/gulp-community/gulp-concat),
[gulp-clean-css](https://github.com/scniro/gulp-clean-css),
[clean-css](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api),
[gulp-concat-css](https://www.npmjs.com/package/gulp-concat-css) [github](https://github.com/mariocasciaro/gulp-concat-css),
[gulp-postcss](https://github.com/postcss/gulp-postcss),
[postcss](https://github.com/postcss/postcss),
[autoprefixer](https://github.com/postcss/autoprefixer),
[cssnano](https://cssnano.co/) [github](https://github.com/cssnano/cssnano),
[gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries),
[gulp-babel](https://www.npmjs.com/package/gulp-babel) [github](https://github.com/babel/gulp-babel),
[gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es),
[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) [github](https://github.com/kangax/html-minifier),
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) [github](https://github.com/imagemin/imagemin),
[browser-sync](https://browsersync.io/docs) [npm](https://www.npmjs.com/package/browser-sync) [github](https://github.com/BrowserSync/browser-sync),

### Maybe add

[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer),
[gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps),
[gulp-webp](https://www.npmjs.com/package/gulp-webp),
[gulp-webp-html](https://www.npmjs.com/package/gulp-webp-html),
[gulp-webpcss](https://www.npmjs.com/package/gulp-webpcss),
[gulp-fonter](https://www.npmjs.com/package/gulp-fonter),
[gulp-ttf2woff](https://www.npmjs.com/package/gulp-ttf2woff),
[gulp-ttf2woff2](https://www.npmjs.com/package/gulp-ttf2woff2),
[gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite),
[terser](https://www.npmjs.com/package/terser) [github](https://github.com/terser/terser),
[gulp-terser](https://www.npmjs.com/package/gulp-terser),

### Addition information

Adding path to src:

```
 /*.{jpg, png, svg, gif, ico, webp}
```

or

```
/*.+(png|jpg|gif|ico|svg|webp)
```

Testing support WebP:

```
function testWebP(callback) {
var webP = new Image();
webP.onload = webP.onerror = function () {
callback(webP.height == 2);
};
webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

if (support == true) {
document.querySelector('body').classList.add('webp');
}else{
document.querySelector('body').classList.add('no-webp');
}
});
```
