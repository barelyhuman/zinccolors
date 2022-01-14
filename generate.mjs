import {minify} from 'csso'
import {mkdirSync, writeFileSync} from 'fs'
import {paramCase} from 'param-case'
import {join} from 'path'
import prettier from 'prettier'
import colors from './index.js'
import {generate as generateSize} from 'sizesnap'
import pc from 'picocolors'

const TEMPLATE_KEY = '{{template}}'
const TARGET_DIR = 'css'
const STYLE_VARIABLE_PREFIX = 'zinc-'
const styleSheetTemplate = `
    :root{
        ${TEMPLATE_KEY}
    }
`

let styleSheet = ``

const pathToCSSVariable = (path) => {
  return `--${path}`
}

const varToStyleString = (variable, value) => {
  return `${variable}:${value};`
}

const appendToStylesheet = (cssString) => {
  if (!styleSheet) {
    styleSheet = styleSheetTemplate
  }
  return styleSheet.replace(
    new RegExp(TEMPLATE_KEY),
    `${cssString}\n{{template}}`
  )
}

const purgeTemplate = (template) => {
  return template.replace(new RegExp(TEMPLATE_KEY), '')
}

const colorExtractor = (source, visitedPath = '') => {
  if (typeof source === 'string') {
    return {color: source, path: visitedPath}
  }

  let colorMap = []

  Object.keys(source).forEach((key) => {
    let pathKey = paramCase(visitedPath)
    if (key !== 'hex') {
      pathKey += '-' + paramCase(key)
    }
    const val = colorExtractor(source[key], pathKey)
    colorMap = colorMap.concat(val)
  })

  return colorMap
}

function main() {
  const _colors = colorExtractor(colors)
  _colors.forEach((variant) => {
    const colorPath = `${STYLE_VARIABLE_PREFIX}${variant.path}`
    const cssVarName = pathToCSSVariable(colorPath)
    const cssVarString = varToStyleString(cssVarName, variant.color)
    styleSheet = appendToStylesheet(cssVarString)
  })

  styleSheet = purgeTemplate(styleSheet)
  const cleanedStyles = prettier.format(styleSheet, {parser: 'css'})

  mkdirSync(TARGET_DIR, {recursive: true})
  writeFileSync(join(TARGET_DIR, 'zinc.css'), cleanedStyles)
  writeFileSync(join(TARGET_DIR, 'zinc.min.css'), minify(cleanedStyles).css)
  console.log(pc.yellow('\n>> Generated Zinc Colors\n'))
  console.log(pc.yellow('>> Sizing Files') + '\n')
  generateSize({log: false, write: false, table: true})
}

main()
