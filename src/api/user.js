import request from '@/utils/request';

export function register(data) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data
  });
}

export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  });
}

export function getInfo(params) {
  return request({
    url: '/api/user/profile',
    method: 'get',
    params,
  });
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  });
}
