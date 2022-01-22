const colors = require('./index.js')

const roles = {
  /* the brightest color */
  bright: colors[50].hex,

  /* the darkest color */
  dark: colors[900].hex,

  /* set of colors that control visual elements */
  base: colors[900].hex,
  surface: colors[800].hex,
  text: colors[400].hex,
  dim: colors[500].hex,
  dimmer: colors[600].hex,
  accent: '#4f46e5',
  success: '#98c379',
  error: '#e06c75',
  warn: '#e5c07b',
}

module.exports = roles
