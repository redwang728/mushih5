// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 'off',
    'semi': ["error", "always"],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-multiple-empty-lines": ["error", {
      "max": 2, // "max"（默认2：）强制连续空行的最大数量
      "maxEOF": 2, // "maxEOF" 在文件末尾强制执行最大数量的连续空行
      "maxBOF": 2 // "maxBOF" 在文件的开头强制执行最大数量的连续空行
    }]
  }
}
