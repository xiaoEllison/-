module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"]
    },
    "postcss-pxtorem": {
      rootValue: (arg) => (arg.file.includes("vant") ? 37.5 : 75),
      propList: ["*"]
    }
  }
};
