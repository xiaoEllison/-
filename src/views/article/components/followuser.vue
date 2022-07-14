<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-if="value"
      @click="follow"
      >关注</van-button
    >
    <van-button class="follow-btn" round size="small" v-else @click="follow"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { deleteFollow, addFollow } from "@/api/user.js";
export default {
/*   model: {
    prop: "isFollow", //key >> value->isFollow
    event: "changeFollow" //自定义事件名称  input->changeFollow
  }, */
  props: {
    autId: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [Boolean]
    }
  },
  data() {
    return {};
  },
  methods: {
    async follow() {
      try {
        if (this.value) {
          //已关转变不关注
          await deleteFollow(this.autId);
        } else {
          await addFollow(this.autId);
        }
        //r让当前的状态变成现在的状态取反
        this.$emit("input", !this.value);
        // this.value = !this.value;
        // 提示 消息
        this.$notify({
          type: "success",
          message: this.value ? "关注成功" : "取消关注"
        });
      } catch (e) {
        this.$notify({
          type: "danger",
          message: "操作失败"
        });
      }
    }
  }
};
</script>

<style></style>
