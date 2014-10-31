# Usage

## Installation
1. Download the repository: [https://github.com/digi...ve/master.zip](https://github.com/digital-telepathy/grunt-boilerplate/archive/master.zip) and rename the extracted folder to your project's name.
1. Move into the directory for your project: `cd my-project`
1. Make sure you have [node installed](http://nodejs.org/). Running `node -v` should return a version number.
1. Run `npm install` to install the required dependencies.

## Configuration Options
You may modify the project name, version, and description in the package.json file if desired. These properties are not used at this time.

At the top of the Gruntfile, there are two options. One refers to CoffeeScript and the other refers to Uglification of the concatenated JavaScript.

### CoffeeScript
* If you want to use CoffeeScript, then just add your `.coffee` files to the coffee folder at the root of the project. All of the .coffee files will be processed into .js files with the same name. You can even create `scripts.coffee` to replace the main `scripts.js` file if you prefer to use Coffee.
* If you prefer not to use CoffeeScript, you can edit the `enableCoffeeScript` variable at the top of the `Gruntfile`. You can also delete the coffee folder if you want to.
```
var enableCoffeeScript = false;
```

In either case, feel free to delete the sample `coffeescript.coffee` and` coffeescript.js` files in the coffee folder and the js folder. These are samples for testing purposes and should be harmless.

### Uglify
In addition to directly running the uglify task as described below, you can configure the Gruntfile to run the uglify task after the JavaScript has been concatenated into one file.
```
var uglifyWhenWatching = true;
```

## Running Grunt or the Dev. Server
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
* CoffeeScript (optional)
* Uglify For JS (optional)
* Modernizer.js
* Respond.js
* HTML5 Shiv
* .editorconfig
* .gitignore
