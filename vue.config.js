const prefixs = ['/paste', '/login', '/regist']
const proxyURI = 'https://paste.potal.cn'
const proxyConfig = prefixs.reduce((config, prefix) => {
  config[prefix] = {
    target: proxyURI,
    secure: false,
    changeOrigin: true
  }
  return config
}, {})

module.exports = {
  devServer: {
    proxy: proxyConfig
  }
}
