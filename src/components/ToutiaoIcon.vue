<template>
  <div>
    <i :class="['toutiao', `toutiao-${icon}`]"></i>
    <!-- <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box"></div> -->
  
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    }
  }
};
</script>

<style>
/* .box{
  width: 200px;
  height: 200px;
  background-color: #eee;
} */
</style>
