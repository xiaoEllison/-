<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResult = false"
      >
      </van-search>
    </form>

    <SearchResult v-if="isResult" :searchText="searchText"></SearchResult>
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @delAllItem="searchHistories = []"
      @onSearch="onSearch"
    ></SearchHistory>
  </div>
</template>

<script>
import { setLocal, getLocal } from "@/utils/storage";
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
export default {
  name: "search-container",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      value: "",
      isResult: false,
      searchText: "",
      searchHistories: getLocal("HISTORYKEY") || []
    };
  },

  created() {},

  methods: {
    onSearch(value) {
      this.searchText = value;
      this.isResult = true;
      // 判断重复
      if (this.searchHistories.indexOf(value) !== -1) {
        //indexOf 返回选中的索引值
        this.searchHistories.splice(this.searchHistories.indexOf(value), 1);
      }
      this.searchHistories.unshift(value);
    },
    onCancel() {
      this.$toast("取消");
      this.$router.push("/home");
    }
  },
  watch: {
    searchHistories(val) {
      setLocal("HISTORYKEY", val);
    }
  }
};
</script>

<style scoped lang="less"></style>
