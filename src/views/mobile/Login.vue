<template>
  <div class="bg">
    <div class="container">
      <div class="header">
        欢迎登录蓝波
      </div>
      <div class="inputView">
        <Input type="text" placeholder="请输入您的手机号" :value.sync="mobile" maxlength="11">
        </Input>
        <Input :type="!showPassword ? 'password' : 'text'" placeholder="请输入密码" :value.sync="password" maxlength="15">
        </Input>
      </div>
      <div class="message">
        完成登录则同意
        <span @click="goWeb(`https://merchant.intbee.com/p/agreement/trade#1`)">《蓝波用户协议》</span>
      </div>
      <button class="btn btn-cell" @click="clickLogin"> 登录 </button>
    </div>
  </div>
</template>

<script>
import Input from "./components/Input.vue"

export default {
  components: {
    Input
  },
  data () {
    return {
      mobile: '',
      password: '',
      showPassword: false,
      path: this.$route.query.path || "",
      webEnv: this.$utils.webEnv(),
    }
  },
  methods: {
    clickLogin (event) {
      // TODO: ADD RULES REQUEST
      let checkMobile = this.$utils.checkMobile
      if (!checkMobile(this.mobile)) {
        this.$utils.toast('请输入正确的手机号码')
        return
      }
      if (!this.password || this.password.length < 6) {
        this.$utils.toast('请输入6位密码')
        return
      }
      this.$utils.toast("登录成功");
      this.$router.push(this.path || "/m/home")
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../base.less";

.bg {
  height: 100%;
}

.container{
  padding: 70px 50px;
  margin-bottom: 0;
  .header {
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 50px;
  }
}
.inputView {
  margin-bottom: @space-20;
  .right {
    width: 22px;
  }
}
.message {
  font-size: 10px;
  color: #999;
  margin-bottom: @space-10;
  >span {
    text-decoration: underline;
    color: #666;
  }
}
</style>
