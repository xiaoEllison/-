<template>
  <div>
    demo
    <h2>{{ $store.state.count }}</h2>
    <br />
    <h2>{{ $store.state.userinfo.name }}</h2>

    <van-field type="number" v-model.number="num"></van-field>
    <button @click="add">count加1</button>
    <button @click="changename">改名字</button>
    <button @click="add2">添加num</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      num: 0
    };
  },
  methods: {
    add() {
      this.$store.commit("changecount");
    },
    changename() {
      this.$store.commit("changename");
    },
    add2() {
      this.$store.commit("changecount2", this.num);
    }
  },
  computed: {
    ...mapState(["count", "userinfo"])
  },
  mounted() {
    console.log(this.userinfo);
  }
};
</script>

<style></style>
