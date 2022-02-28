import { terser } from "rollup-plugin-terser";
export default {
  // 核心选项
  input: './Tablet-2.0.js',     // 必须
  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file: './dist/Tablet-2.0.min.js',    // 必须
    format: 'iife',  // 必须
    name: 'Table'
  },
  plugins: [
    terser({ compress: { drop_console: true } })
  ]
}
