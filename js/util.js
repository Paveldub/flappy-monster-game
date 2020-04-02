// GLOBAL FUNCTIONS
// animation function code https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

// Math Random function
window.getRandomInt = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //Максимум не включается, минимум включается
}

window.getRandomColor() = function () {
  let red = getRandomInt(0, 257)
  let green = getRandomInt(0, 257)
  let blue = getRandomInt(0, 257)
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
}

console.log('utils')
