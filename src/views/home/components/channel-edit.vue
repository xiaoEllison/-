<template>
  <div class="channel-edit">
    <van-cell title="频道编辑" style="text-align: center" />
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in MyChannels"
        :key="index"
        @click="toChooseChannel(item, index)"
      >
        <span class="text" :class="{ active: active === index }" slot="text">{{
          item.name
        }}</span>
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="close"></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in recommendChannnels"
        :key="index"
        icon="plus"
        @click="addchannel(item)"
      >
        <span class="text2" slot="text">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  fetchAddChannels,
  delateChannels
} from "@/api/channel";
import { Notify } from "vant";
import { mapState } from "vuex";
import { setLocal } from "@/utils/storage";
import { USERCHANNELKEY } from "@/utils/constants.js";

// import differenceBy from "lodash";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    MyChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false
    };
  },
  computed: {
    recommendChannnels() {
      return this.allChannels.filter((item) => {
        return !this.MyChannels.some((MyChannels) => MyChannels.id === item.id);
      });
    },
    ...mapState(["user"])
    //  recommendChannles() {
    //   return differenceBy(this.allChannels, this.MyChannels, "id");
    // },
  },
  watch: {},
  created() {
    this.getAllChannels();
  },
  mounted() {},
  methods: {
    async getAllChannels() {
      const res = await getAllChannels();
      console.log(res);
      this.allChannels = res.data.data.channels;
    },
    async addchannel(channel) {
      this.MyChannels.push(channel);
      // 设置数据持久化
      if (this.user) {
        // token 登录 请求接口
        try {
          // 已登录，数据存储到线上
          await fetchAddChannels({
            id: channel.id, // 频道 id
            seq: this.MyChannels.length // 频道的 序号
          });
          this.$toast("添加成功");
        } catch (err) {
          this.$toast("保存失败");
        }
      } else {
        //token 没有登录
        setLocal(USERCHANNELKEY, this.MyChannels);
      }
    },
    toChooseChannel(channel, index) {
      console.log(channel, index);

      // 编辑状态
      if (this.isEdit) {
        if (index === 0)
          return Notify({ type: "danger", message: "首项不可以删除" });
        if (index <= this.active) {
          this.$emit("toChooseChannel", this.active - 1, true);
        }
        this.MyChannels.splice(index, 1);
        // 让删除的数据持久化
        this.delateChannel(channel)

        // 非编辑状态
      } else {
        this.$emit("toChooseChannel", index, false);
      }
    },
    async delateChannel(channel) {
      //已登录删除
      
      try {
        if (this.user) {
          await delateChannels(channel.id)
        } else {
          setLocal(USERCHANNELKEY, this.MyChannels)
        }
        this.$toast("删除成功");
      } catch (e) {
        this.$toast("删除失败");
      }
    }
  }
};
</script>

<style scoped lang="less">
.channel-edit {
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
    }
  }
}
/deep/ .recommend-grid {
  .van-grid-item__content {
    flex-direction: row;
    color: #222;
    .van-icon {
      font-size: 24px;
    }

    .van-grid-item__text {
      font-size: 20px;
      margin-top: 0;
    }
  }
}
/deep/ .van-icon-close {
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 36px;
  color: #ccc;
}
/deep/ .van-grid-item__content {
  background-color: #f5f5f6;
  .van-grid-item__text,
  .text {
    color: #222;
    font-size: 20px;
    white-space: nowrap;
  }
  .text2 {
    color: #222;
    font-size: 20px;
    // white-space: nowrap;
  }

  .active {
    color: red;
  }
}
/deep/ .van-grid-item__icon-wrapper {
  position: unset;
}
</style>
