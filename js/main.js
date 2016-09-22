// jQuery and Bootstrap are considered global and should
// be required using the require syntax.
window.$ = window.jQuery = require('jquery');
var Bootstrap = require('bootstrap-sass');


// Other things can be imported using the ES6 Import syntax
import React from 'react'
import ReactDOM from 'react-dom'
import MyApp from './components/app'
ReactDOM.render(<MyApp message="Hello World!"/>, document.getElementById('my-app'))


// ES6 features work here too
const foo = 42
const bar = `Some text with a variable: ${foo} in it`
console.log(bar)


$(function(){
  console.log("DOM Ready from jQuery.")
  console.log($('h1:first').text() + '.')
})

