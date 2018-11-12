import {
  css
} from "docz-plugin-css";


export default {
  title: "Atlantis 🔱",
  typescript: true,
  port: 3333,
  codeSandbox: false,
  plugins: [
    css({
      preprocessor: "postcss",
      cssmodules: true,
    }),
  ],
}
