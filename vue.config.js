module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://paste.potal.cn',
        secure: false,
        changeOrigin: true
      }
    }
  }
}
