module.exports = {
  root: true,
  extends: [
    '@antfu/eslint-config-ts',
    '@abmao/eslint-config-ts',
    // 新增，必须放在最后面
    'plugin:prettier/recommended',
  ],
}
