module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0, // 忽略空格
    'indent': 0, // 忽略缩进
    'no-underscore-dangle': 0, // 无下划线
    semi: ['error', 'never'], // 无分号
    'no-plusplus': 0, // 禁止使用++，--
    'linebreak-style': [0, 'error', 'windows'],
    'import/extensions': 0, // import不需要写文件扩展名
    'camelcase': 0 // 忽略强制驼峰命名
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
