# Grunt Boilerplate (Sass)

### Requirements
* [Node.js](http://nodejs.org/)

## Installation
1. Download the repository and rename the extracted folder to your project's name.

1. Move into the directory for your project: `cd my-project`

1. Make sure you have [node installed](http://nodejs.org/). Running `node -v` should return a version number.

1. Install Grunt's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows).
  ```
  npm install -g grunt-cli
  ```

1. Run `npm install` to install the required dependencies.

## Configuration Options
You may modify the project name, version, and description in the `package.json` file if desired. These properties are not used at this time.

At the top of the Gruntfile you may edit the [Sass Output Style](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style).

### Sass Output Style
There is a convenience variable to set the [Sass Output Style](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style) in the configuration block at the top of the Gruntfile.
```
var sassOutputStyle = 'expanded';
```

## Making a build or running the dev server

* Running `npm run dev` will transpile your JS, compile your Sass, and watch for changes. BrowserSync will also be started.

* Running `npm run build` will transpile your JS, compile your Sass, uglify the transpiled JS, then exit.

## Deploying to Heroku

Add the remote to your working copy:
```bash
$ git remote add heroku git@heroku.com:app-name.git
```

Ensure you have the remote added to your working copy:
```bash
$ git remote -v
heroku  git@heroku.com:app-name.git (fetch)
heroku  git@heroku.com:app-name.git (push)

```

This should output the remotes of the project. One should be called `heroku` and point to the Heroku staging subdomain.

Use the following command to push to Heroku:
```bash
$ git push heroku master

```

Make sure your `index.js` file references the correct build directly for Heroku to work correctly.

## Working With The Project

### Sass/CSS
* `/sass/_variables.scss` contains all of your Bootstrap overrides, and any global variables you would like to define.

* `/sass/main.scss` serves as a manifest for loading other scss files.

* `/sass/partials/home.scss` is a sample of a custom included Sass file for custom styles.

### Fontello
A sample Fontello configuration is included in the package for some simple social icons. To fully leverage Fontello you will want to add/remove icons from the set:
* Visit [Fontello's Website](http://fontello.com/)
* Drag the `/fonts/fontello/config.json` file into the browser. This will load the saved configuration for modification.
* Select or upload new icons.
* Click the `Download webfont` button.
* Extract the downloaded zip file and replace the contents of `/fonts/fontello/` with the contents of the zip file.
* See the `/fonts/fontello/css/fontello-codes.css` file for a quick list of all the CSS classes.

### Browserify/Babelify
By default, the Babel configuration is set up for ES6 and React. There is one JavaScript file by default, and `require`/`import` statements can be used to compose the needed scripts.

### PostCSS
The PostCSS plugin allows for fallbacks including: `autoprefixer`, `cssnano`, & `pixrem`. These will enable bore brief code and smaller oput files.

  * By default `pixrem` is not used.
  * `cssnano` is not run during development.

## The Project Includes

* .gitignore
* .editorconfig
* Bootstrap 3
* Glyphicons (Bootstrap 3)
* Fontello (sample icons)
* jQuery
* Sass
* Uglify For JS on build
* browsersync
* Heroku push/deploy support
* PostCSS with: `autoprefixer`, `cssnano`, `pixrem`
