import request from '@/utils/request';

export function test(code) {
  return request({
    url: '/api/test/' + code,
    method: 'get',
    params: {}
  });
}
