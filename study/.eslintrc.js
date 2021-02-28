module.exports = {
  root: true,

  env: {
    // 添加browser和es6的环境
    browser: true,
    es6: true,
    node: true,
  },
  // 关键：启用 airbnb 规则
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // 使用语言及版本
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  // 个人自定义规则
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	'no-console':'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': 0,
    'no-multi-assign': 0,
    'linebreak-style': ["off", "windows"],
    'import/order': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-tabs': 0,
    'no-underscore-dangle': 0,
	"indent": ["off",2],
  },
};