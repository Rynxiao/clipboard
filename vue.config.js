module.exports = {
  devServer: {
    proxy: {
      '/paste': {
        target: 'https://paste.potal.cn',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
