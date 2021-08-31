import request from "@/utils/request";

export function test(code) {
  return request({
    url: "/api/test/" + code,
    method: "get",
    params: {}
  });
}

export function start(code) {
  return request({
    url: "/api/test/" + code + "/start",
    method: "get",
    params: {}
  });
}

export function answer(data) {
  return request({
    url: "/api/test/" + data.code + "/answer",
    method: "post",
    data
  });
}
