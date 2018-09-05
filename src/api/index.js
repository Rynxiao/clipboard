import api from './common'

export function login (data) {
  return api({
    url: 'login',
    method: 'post',
    data
  })
}

export function register (data) {
  return api({
    url: 'regist',
    method: 'post',
    data
  })
}

export function getContentList (params) {
  return api({
    url: 'query',
    params
  })
}

export function insertContent (data) {
  return api({
    url: 'post',
    method: 'post',
    data
  })
}

export function updateContent (data) {
  return api({
    url: 'update',
    method: 'post',
    data
  })
}

export function deleteContent (data) {
  return api({
    url: 'delete',
    method: 'post',
    data
  })
}
