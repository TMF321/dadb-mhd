module.exports = {
  plugins: {
    autoprefixer: {
      // 不需要设置这个选项，他会自动去使用 .browserslistrc 这个文件的配置
      // browsers: ['Android >= 4.0', 'iOS >= 8']
    },

    'postcss-pxtorem': {
      // 转换的基准值 1rem = 37.5px
      // xrem = 44px
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
