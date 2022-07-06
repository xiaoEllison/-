<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <template #left>
        <!-- <van-icon name="cross" @click.native="$router.back()" color="white"/> -->
        <toutiao-icon
          icon="guanbi1"
          class="closebtn"
          @click.native="$router.back()"
        />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="用户名"
        :rules="rule.mobile"
        required
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" class="toutiao" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="密码"
        :rules="rule.code"
        required
        maxlength="6"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" class="toutiao" />
        </template>

        <template #right-icon>
          <van-count-down
            :time="5000"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            class="send-sms-btn"
            native-type="button"
            v-else
            @click="sendPhoneCode"
            :disabled="isDisable"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCode } from "@/api/user.js";
import { Toast } from "vant";
import ToutiaoIcon from "@/components/ToutiaoIcon.vue";

export default {
  components: { ToutiaoIcon },
  data() {
    return {
      isDisable: false,
      isCountDownShow: false,
      username: "",
      password: "",
      user: {
        mobile: "13911111112",
        code: "246810"
      },
      rule: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空"
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空"
          },
          {
            pattern: /^\d{6}$/,
            message: "验证号格式不正确"
          }
        ]
      }
    };
  },
  methods: {
    //登录
    async onSubmit() {
      try {
        const res = await login(this.user);
        this.$store.commit("setUser", res.data.data);
        console.log(res);
        Toast.success("登录成功");
        this.$router.push("/my");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "登录失败");
      }
    },
    // 发验证码
    async sendPhoneCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        // console.log(e);
        return;
      }
      try {
        this.isDisable = true;

        await getCode(this.user.mobile);
        console.log("发送验证码成功");
        this.isCountDownShow = true;
        this.$toast.success("发送验证码成功"); //实例上引用toast(提示框)
      } catch (e) {
        this.$toast.fail(e.response.data.message || "出错了");
        // this.isCountDownShow = false;
      } finally {
        this.isDisable = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 158px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border: solid 2px #0dbc79;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
.closebtn {
  color: #ffffff;
  font-size: 14px;
}
</style>
