<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="inputComment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button class="post-btn" size="small" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comments";

export default {
  name: "PostComment",
  components: {},
  props: {
    target: {
      type: [String, Number]
    }
  },
  data() {
    return {
      inputComment: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      // loading效果
      this.$toast.loading({
        duration: 0, //表示toast不会消失
        forbidClick: true //加载中不允许点击背景
      });
      // 发布评论
      try {
        const res = await addComment({
          target: this.target,
          content: this.inputComment,
          art_id: null
        });
        this.$toast.success("发布评论成功"),
        this.inputComment=''
        console.log(res);
      } catch (e) {
        this.$toast.success("发布评论失败");
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
