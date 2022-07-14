<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon
          name="arrow-left"
          color="white"
          @click.native="$router.back()"
        />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleInfo.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articleInfo.pubdate }}</div>

          <FollowUser
            v-model="articleInfo.is_followed"
            :autId="articleInfo.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->

        <div
          class="article-content markdown-body"
          v-html="articleInfo.content"
          ref="content"
        ></div>
        <van-divider>正文结束</van-divider>
        <CommentList :articleId="articleInfo.art_id"></CommentList>
      </div>

      <!-- 评论列表 -->

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="articleInfo.comm_count" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <CollectArtice
        v-model="articleInfo.is_collected"
        :autId="articleInfo.aut_id"
      ></CollectArtice>
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <likeArticle v-model="articleInfo.attitude" :articleId="articleInfo.art_id "></likeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup position="bottom" style="height: 25%" v-model="isPostShow">
      <PostComment :target="articleInfo.art_id "></PostComment>
    </van-popup>
  </div>
</template>

<script>
import PostComment from "./components/post-comment.vue";
import CommentList from "./components/comment-list.vue";
import likeArticle from "./components/like-article.vue";
import CollectArtice from "@/views/article/components/collect-article.vue";
import FollowUser from "@/views/article/components/followuser.vue";
import { ImagePreview } from "vant";
import "github-markdown-css";
import { getArticleById } from "@/api/article.js";

// import { deleteFollow, addFollow } from "@/api/user.js";
export default {
  // name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArtice,
    CommentList,
    likeArticle,
    PostComment
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      articleInfo: [],
      isLoading: false,
      errStatus: "",
      isPostShow: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById();
  },
  mounted() {},

  methods: {
    
    /* 图片预览 */
    previewImg() {
      // console.log(this.$refs.content);
      const imgs = this.$refs.content.querySelectorAll("img");
      const images = [];
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.addEventListener("click", function () {
          ImagePreview({
            images: images,
            startPosition: index
          });
        });
      });
      // console.log(images);
    },
    /* 获取文章的状态。加载，正文，404，未知错误 */
    async getArticleById() {
      this.isLoading = true;
      try {
        const res = await getArticleById(this.articleId);
        console.log(res.data.data);
        this.articleInfo = res.data.data;
        this.$nextTick(() => {
          this.previewImg();
        });
      } catch (e) {
        if (e.response?.status === 404) {
          this.errStatus = 404;
        }
      }
      this.isLoading = false;
    }
  }
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
