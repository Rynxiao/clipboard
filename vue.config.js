module.exports = {
  devServer: {
    proxy: {
      '/paste': {
        target: 'http://paste.potal.cn',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
