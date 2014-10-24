## Usage

### Installation
1. Download the repository: [https://github.com/digi...ve/master.zip](https://github.com/digital-telepathy/grunt-boilerplate/archive/master.zip) and rename the extracted folder to your project's name.
1. Move into the directory for your project: `cd my-project`
1. Make sure you have [node installed](http://nodejs.org/). Running `node -v` should return a version number.
1. Run `npm install` to install required dependencies.

### Running
* `grunt` will concatenate your scripts, compile your Sass, and watch for changes.

* `grunt serve` or `grunt dev` will concatenate your scripts, compile your Sass, **start a server on port 8000 [http://localhost:8000/](http://localhost:8000/)**, and watch for changes.

* `grunt uglify` will take your concatenated JavaScript and compress it as a new file with the `.min.js` extension.

### Editing
* `/sass/_variables.scss` contains all of your Bootstrap overrides, and any global variables you would like to define.

* `/sass/main.scss` serves as a manifest for loading other scss files.

* `/sass/partials/home.scss` is a sample of a custom included Sass file for custom styles.

### Includes

* Bootstrap 3
* jQuery
* Sass
* Modernizer.js
* Respond.js
* HTML5 Shiv
* .editorconfig
* .gitignore
