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
 

/**
 * 点赞
 */
 export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
 }
/**
 * 取消点赞
 */
 export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    url: `v1_0/article/likings/${articleId}`
  })
}
/**
 * 收藏文章
 */
 export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
 }
/**
 * 取消收藏文章
 */
 export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}