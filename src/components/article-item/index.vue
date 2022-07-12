<template>
  <div>
    <van-cell :title="article.title" :to="`/art/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image :src="article.cover.images[0]" class="one-img" />
      </template>
      <template #label>
        <div class="img-box" v-if="article.cover.type === 3">
          <van-image
            class="images-three"
            v-for="(item,index) in article.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <span>{{ article.aut_name }}</span
        ><span>评论{{ article.comm_count }}</span><span>{{ article.pubdate | relativeTime }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="less">
.img-box {
  display: flex;
  justify-content: space-between;
  .images-three {
    width: 200px;
    height: 150px;
  }
}
.one-img {
  width: 150px;
  height: 150px;
}
span{
  margin-right: 20px;
}
</style>
