import request from '@/utils/request';

export function home(params) {
  return request({
    url: '/api/home',
    method: 'get',
    params
  });
}

export function categories(params) {
  return request({
    url: '/api/categories',
    method: 'get',
    params
  });
}

export function category(id) {
  return request({
    url: '/api/category/' + id,
    method: 'get',
  });
}
