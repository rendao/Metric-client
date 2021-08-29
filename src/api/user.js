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

export function getInfo(token) {
  return request({
    url: '/api/auth/profile',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  });
}
