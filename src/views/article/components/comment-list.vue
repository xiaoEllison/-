<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleCommentItem
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
      ></ArticleCommentItem>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments } from "@/api/comments.js";
import ArticleCommentItem from "./article-comment-item";

export default {
  name: "ArticleComment",
  components: {
    ArticleCommentItem
  },
  props: {
    articleId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      error: false, //
      limit: 10
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: "a", // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.articleId.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 每页大小
        });
        console.log(res.data.data.results);
        this.list.push(...res.data.data.results);
        this.loading = false;

        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true;
        } else {
          this.offset = res.data.data.last_id;
        }
      } catch (e) {
        this.error = true;
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
