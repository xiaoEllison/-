<template>
  <div class="collectArticle">
    <van-button class="btn" icon="star"  @click="onCollected">
      <template #icon>
        <van-icon
          :name="value ? 'star' : 'star-o'"
          :color="value ? 'orange' : ''"
          :loading="loading"
         
        ></van-icon>
      </template>
    </van-button>
  </div>
</template>

<script>
import { deleteCollect, addCollect } from "@/api/user";
export default {
  name: "CollectArticle",

  props: {
    value: {
      type: Boolean
    },
    autId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async onCollected() {
      console.log(123);
      this.loading = true;
      if (this.value) {
        await deleteCollect(this.autId);
      } else {
        await addCollect(this.autId);
      }
      // 页面的更新
      this.$emit("input", !this.value);
      this.$toast.success(this.value ? "取消收藏" : "收藏成功");
      //
    }
  }
};
</script>

<style scoped lang="less">
.btn{
  border: none;
}</style>
