<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <span slot="title" v-html="highlightText(item)"></span>
    
    </van-cell>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { getSearchSuggestion } from "@/api/search";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: String
  },
  data() {
    return {
      list: []
    };
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        // console.log(value);
        this.getSearchSuggestion(value);
      }, 500),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getSearchSuggestion(q) {
      try {
        const res = await getSearchSuggestion(q);
        // console.log(res);
        this.list = res.data.data.options || [];
      } catch (e) {
        this.$toast("获取失败");
      }
    },
    // async getSearchSuggestion(q) {
    //   const res = await getSearchSuggestion(q);
    //   console.log(res);
    //   this.list = res.data.data.options.map((item) => {
    //     const reg = new RegExp(this.searchText, "gi");
    //     return item.replace(
    //       reg,
    //       `<span style="color:red">${this.searchText}</span>`
    //     );
    //   });
      // console.log(this.list);
    // }
    highlightText(item) {
      const highlightStr = `<span style="color:red">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      // text.replace(/匹配的内容/gi, highlightStr)
      return item.replace(reg, highlightStr);
    }
  }
};
</script>

<style scoped lang="less"></style>
