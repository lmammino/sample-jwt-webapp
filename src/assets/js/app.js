/* eslint-disable */
var colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']

function createElements (root, elementCount) {
  return Array.from({ length: elementCount }).map(function (_, index) {
    var element = document.createElement('div')
    element.classList = ['fetti']
    var color = colors[index % colors.length]
    element.style['background-color'] = color // eslint-disable-line space-infix-ops
    element.style.width = '10px'
    element.style.height = '10px'
    element.style.position = 'absolute'
    root.appendChild(element)
    return element
  })
}

function randomPhysics (angle, spread, startVelocity) {
  var radAngle = angle * (Math.PI / 180)
  var radSpread = spread * (Math.PI / 180)
  return {
    x: 0,
    y: 0,
    wobble: Math.random() * 10,
    velocity: startVelocity * 0.5 + Math.random() * startVelocity,
    angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
    angle3D: -(Math.PI / 4) + Math.random() * (Math.PI / 2),
    tiltAngle: Math.random() * Math.PI
  }
}

function updateFetti (fetti, progress, decay) {
  fetti.physics.x += Math.cos(fetti.physics.angle2D) * fetti.physics.velocity
  fetti.physics.y += Math.sin(fetti.physics.angle2D) * fetti.physics.velocity
  fetti.physics.z += Math.sin(fetti.physics.angle3D) * fetti.physics.velocity
  fetti.physics.wobble += 0.1
  fetti.physics.velocity *= decay
  fetti.physics.y += 3
  fetti.physics.tiltAngle += 0.1

  var _fetti$physics = fetti.physics,
    x = _fetti$physics.x,
    y = _fetti$physics.y,
    tiltAngle = _fetti$physics.tiltAngle,
    wobble = _fetti$physics.wobble

  var wobbleX = x + 10 * Math.cos(wobble)
  var wobbleY = y + 10 * Math.sin(wobble)
  var transform = 'translate3d(' + wobbleX + 'px, ' + wobbleY + 'px, 0) rotate3d(1, 1, 1, ' + tiltAngle + 'rad)'

  fetti.element.style.transform = transform
  fetti.element.style.opacity = 1 - progress
}

function animate (root, fettis, decay) {
  var totalTicks = 200
  var tick = 0

  function update () {
    fettis.forEach(function (fetti) {
      return updateFetti(fetti, tick / totalTicks, decay)
    })

    tick += 1
    if (tick < totalTicks) {
      window.requestAnimationFrame(update)
    } else {
      fettis.forEach(function (fetti) {
        return root.removeChild(fetti.element)
      })
    }
  }

  window.requestAnimationFrame(update)
}

function confetti (root) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$angle = _ref.angle,
    angle = _ref$angle === undefined ? 90 : _ref$angle,
    _ref$decay = _ref.decay,
    decay = _ref$decay === undefined ? 0.9 : _ref$decay,
    _ref$spread = _ref.spread,
    spread = _ref$spread === undefined ? 45 : _ref$spread,
    _ref$startVelocity = _ref.startVelocity,
    startVelocity = _ref$startVelocity === undefined ? 45 : _ref$startVelocity,
    _ref$elementCount = _ref.elementCount,
    elementCount = _ref$elementCount === undefined ? 50 : _ref$elementCount

  var elements = createElements(root, elementCount)
  var fettis = elements.map(function (element) {
    return {
      element: element,
      physics: randomPhysics(angle, spread, startVelocity)
    }
  })

  animate(root, fettis, decay)
}

var btn = document.getElementById('powerful-features')
if (btn) {
  btn.addEventListener('click', function (event) {
    event.preventDefault()
    confetti(btn)
  })
}
