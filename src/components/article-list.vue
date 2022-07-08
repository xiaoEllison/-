<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1500"
    >
    
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了"
    >
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        
      /> -->
      <ArticleItem v-for="(item, index) in list" :key="index" :article="item" />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      isRefreshLoading: false,
      successText: "",
      error: false,
      timestamp: null
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad() {
      try {
        const res = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        });
        console.log(res);
        this.list = [...this.list, ...res.data.data.results];
        this.loading = false;
        console.log(res.data.data.results.length);
        if (res.data.data.results.length === 0) {
          this.finished = true;
        } else {
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (e) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const res = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        });
        this.list = [...res.data.data.results, ...this.list];
        this.isRefreshLoading = false;
        this.successText = `更新了${res.data.data.results.length}条数据`;
      } catch (err) {
        console.log(err);
        this.isRefreshLoading = false; // 关闭下拉刷新的 loading 状态
        this.$toast("刷新失败");
      }
    }
  }
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
