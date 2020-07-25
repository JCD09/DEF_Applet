// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/DEF_Applet/'
//     : '/'
// }

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";`
      }
    }
  }
};