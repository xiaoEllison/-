<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :to="`/art/${item.art_id}`"
      >
        <template #default v-if="item.cover.type === 1">
          <van-image :src="item.cover.images[0]" class="one-img" />
        </template>
        <template #label>
          <div class="img-box" v-if="item.cover.type === 3">
            <van-image
              class="images-three"
              v-for="(item, index) in item.cover.images"
              :key="index"
              :src="item"
            />
          </div>
          <span>{{ item.aut_name }}</span
          ><span>评论{{ item.comm_count }}</span
          ><span>{{ item.pubdate | relativeTime }}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";

export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: String
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const res = await getSearchResult({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索关键字
      });
      // console.log(res);
      this.list = [...this.list, ...res.data.data.results];
      this.loading = false;

      if (res.data.data.results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
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
span {
  margin-right: 20px;
}
</style>
