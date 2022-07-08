<template>
  <div class="home-container">
    <!-- 搜索 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button round size="small" block class="search-btn">
          <van-icon name="search" color="white" /><span style="color: white"
            >搜索</span
          >
        </van-button>
      </template>
    </van-nav-bar>
    <!--  -->
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
      <Articlelist  :channel="item"></Articlelist>
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import Articlelist from '@/components/article-list'
import { getChannel } from "@/api/channel";
export default {
  name: "HomePage",
  components: {
    Articlelist
  },
  props: {},
  data() {
    return {
      active: "",
      channels: {}
        
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getChannel()
  },
  mounted() {},
  methods: {
    async getChannel() {
      const res = await getChannel();

      console.log(res.data.data.channels);
      this.channels=res.data.data.channels
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}
.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
</style>
