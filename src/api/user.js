import request from "@/utils/request";
// import store from "@/store";
// 账号
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data
  });
};
// 验证码
export const getCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`
  });
};
//用户信息（需要token）
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user"
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};
/**
 * 添加关注
 */
export const addFollow = (userId) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target: userId
    }
  });
};

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${userId}`
  });
};
