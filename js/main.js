// jQuery and Bootstrap are considered global and should
// be required using the require syntax.
window.$ = window.jQuery = require('jquery')
// window.Tether = require('tether') // required for tooltips
// require('../bootstrap/js/src/alert.js')
require('../bootstrap/js/src/button.js')
// require('../bootstrap/js/src/carousel.js')
require('../bootstrap/js/src/collapse.js')
require('../bootstrap/js/src/dropdown.js')
require('../bootstrap/js/src/modal.js')
// require('../bootstrap/js/src/scrollspy.js')
// require('../bootstrap/js/src/tab.js')
// require('../bootstrap/js/src/tooltip.js')
// require('../bootstrap/js/src/popover.js')


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

