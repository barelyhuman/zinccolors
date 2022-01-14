<h1 align="center">zinccolors</h1>
<p align="center">JS/CSS color variables for the monochromatic zinc/gray pallete</p>

If you like any of my work, you can support me on: https://barelyhuman.dev/donate

[![](https://img.shields.io/badge/license-mit-black?style=for-the-badge)](LICENSE)

## About

pretty sure it's easier to install a package than recreate the color object and css everytime I need these colors

## Usage

```sh
npm i zinccolors
# or
yarn add zinccolors
```

```js
import zinc from "zinccolors"

console.log(zinc.900.hex) //=> #18181b
```

```css
@import url(https://unpkg.com/zinccolors/css/zinc.min.css);

body {
  bg: var(--zinc-900);
  fg: var(--zinc-100);
}
```

## License

[MIT](LICENSE) &copy; Reaper
