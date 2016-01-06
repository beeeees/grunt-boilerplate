# Grunt Boilerplate (Sass)

### Requirements
* [Node.js](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/)
* [Sass Gem](http://sass-lang.com/install)

## Installation
1. Download the repository: [https://github.com/digi...ve/master.zip](https://github.com/digital-telepathy/grunt-boilerplate-sass/archive/master.zip) and rename the extracted folder to your project's name.

1. Move into the directory for your project: `cd my-project`

1. Make sure you have [node installed](http://nodejs.org/). Running `node -v` should return a version number.

1. Install Grunt's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows).
  ```
  npm install -g grunt-cli
  ```

1. Run `npm install` to install the required dependencies.

## Configuration Options
You may modify the project name, version, and description in the `package.json` file if desired. These properties are not used at this time.

At the top of the Gruntfile, there are two options. One refers to the [Sass Output Style](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style) and the other refers to Uglification of the concatenated JavaScript.

### Uglify
In addition to directly running the uglify task as described below, you can configure the Gruntfile to run the uglify task after the JavaScript has been concatenated into one file.
```
var uglifyWhenWatching = true;
```

### Sass Output Style
There is a convenience variable to set the [Sass Output Style](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style) in the configuration block at the top of the Gruntfile.
```
var sassOutputStyle = 'expanded';
```

## Running Grunt Or The Server
There are three basic commands that will start grunt. You may want to use the connect server if you have static HTML only. If you have some PHP in your project (header partials, etc.) then you can just use the grunt command without the server. The `dev` command is just an alias for `serve`.

* Running `grunt` will concatenate your scripts, compile your Sass, and watch for changes.

* Running `grunt serve` or `grunt dev` will concatenate your scripts, compile your Sass, **start a server on port 8000 [http://localhost:8000/](http://localhost:8000/)**, and watch for changes.

* Running `grunt uglify` will take your concatenated JavaScript and compress it as a new file with the `.min.js` extension, then exit.

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

### Concat
By default, all of the JavaScript is concatenated into one file `all.js`. There are a few exceptions to this rule, and a few JavaScript files that get priority.

The files are concatenated in this order:

* jQuery
* All of the Bootstrap JS (in a specific order)
* The contents of `/js/vendor/`
  * `html5shiv.js` is explicitly excluded
  * `respond.min.js` is explicitly excluded
* All of the `.js` files in the `/js/` folder
  * `all.js` is explicitly excluded
  * `all.min.js` is explicitly excluded
* The main `scripts.js` file

### PostCSS
The PostCSS plugin allows for fallbacks including: `autoprefixer`, `cssnano`, & `pixrem`. THese will enable bore brief code and smaller oput files. By default `pixrem` is commented out.

### CoffeeScript
If you want to use CoffeeScript, then just create a `coffee` folder at the root of the project and add your `.coffee` files to it. All of the `.coffee` files will be processed into `.js` files (and saved to the `js` folder) with the same name. You can even create `scripts.coffee` in your `coffee` folder to replace the main `scripts.js` file.

The `html5shiv.js` and `respond.js` files are needed for IE 8 to work correctly with Bootstrap 3. Additionally, these files do not work correctly unless included in the &lt;head&gt; of the document. They are handled via a conditional comment tag.
```
<!--[if lt IE 9]>
  <script src="js/vendor/html5shiv.js"></script>
  <script src="js/vendor/respond.min.js"></script>
<![endif]-->
```

## The Project Includes

* .gitignore
* .editorconfig
* Bootstrap 3
* Glyphicons (Bootstrap 3)
* Fontello (sample icons)
* jQuery
* Sass
* CoffeeScript (optional)
* Uglify For JS (optional)
* Modernizer.js
* Respond.js (IE 8)
* html5shiv.js (IE 8)
* browsersync
* Heroku push/deploy support
* PostCSS with: `autoprefixer`, `cssnano`, `pixrem`
