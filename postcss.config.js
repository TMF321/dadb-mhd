module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"]
    },

    "postcss-pxtorem": {
      // 转换的基准值 1rem = 37.5px
      // xrem = 44px
      rootValue: 37.5,
      propList: ["*"]
    }
  }
};
