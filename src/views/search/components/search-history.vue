<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelateState">
        <van-tag class="btn" type="danger" @click="delAllItem"
          >全部删除</van-tag
        >
        <van-tag class="btn" type="success" @click="isDelateState = false"
          >完成</van-tag
        >
      </div>

      <van-icon name="delete" @click="isDelateState = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="delHistoryItem(item, index)"
    >
      <van-icon name="close" v-if="isDelateState" />
    </van-cell>
  </div>
</template>

<script>

export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDelateState: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delAllItem() {
      this.$emit("delAllItem");
    },
    delHistoryItem(item, index) {
      if (this.isDelateState) {
        this.searchHistories.splice(index, 1);
      } else {
        this.$emit("onSearch", item);
      }
    }
  }
};
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>
