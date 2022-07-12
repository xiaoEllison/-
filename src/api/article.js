import request from "@/utils/request";
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params
  });
};
// 获取文章接口
export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: "v1_0/articles/" + articleId
  });
};
