<template>
  <div class="layout-container">

    <router-view></router-view>

    <van-tabbar route v-model="active" class="layout-tabbar">
      <van-tabbar-item to="/home">
        <template #icon>
          <toutiao-icon icon="shouye" class="toutiao" />
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item  to="/qa">
        <template #icon>
          <toutiao-icon icon="yanzhengma" class="toutiao"/>
        </template>
        问答</van-tabbar-item
      >
      <van-tabbar-item   to="/video">
        <template #icon>
          <toutiao-icon icon="shipin" class="toutiao"/>
        </template>
        视频</van-tabbar-item
      >
      <van-tabbar-item  to="/my">
        <template #icon>
          <toutiao-icon icon="wode" class="toutiao" />
        </template>
        我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import ToutiaoIcon from "@/components/ToutiaoIcon.vue";
export default {
  components: { ToutiaoIcon },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    /deep/.toutiao {
      font-size: 40px;
    }
  }
}
</style>
