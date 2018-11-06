import {
  css
} from 'docz-plugin-css'


export default {
  title: "Atlantis 🔱",
  src: ".",
  typescript: true,
  port: 3333,
  plugins: [
    css({
      preprocessor: 'postcss',
      cssmodules: true,
    }),
  ],
}
