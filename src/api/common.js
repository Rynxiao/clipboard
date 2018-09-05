import axios from 'axios'

export default async function api (config) {
  const defaultConfig = {
    baseURL: '/',
    method: 'get',
    params: {},
    timeout: 1000,
    responseType: 'json'
  }

  const params = Object.assign({}, defaultConfig, config)
  const res = await axios(params).catch(err => console.log(err))
  if (res && res.status === 200) {
    return res.data
  }
  return {}
}
