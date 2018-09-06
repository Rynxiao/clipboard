import api from './common'

export function login(data) {
  return api({
    url: 'login',
    method: 'post',
    data
  })
}

export function register(data) {
  return api({
    url: 'regist',
    method: 'post',
    data
  })
}

export function getContentList(params) {
  return api({
    url: 'paste/query',
    params
  })
}

export function insertContent(data) {
  return api({
    url: 'paste/post',
    method: 'post',
    data
  })
}

export function updateContent(data) {
  return api({
    url: 'paste/update',
    method: 'post',
    data
  })
}

export function deleteContent(data) {
  return api({
    url: 'paste/delete',
    method: 'post',
    data
  })
}
