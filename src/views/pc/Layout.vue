<template>
  <div class="layout">
    <div v-if="!noHeader" class="header">
      <span class="left">
        <!-- <img @click="$router.go(-1)" src="../../assets/img/back.png" alt=""> -->
      </span>
      <span>{{name}}</span>
      <span class="right" v-if="showRight">
        <!-- <img src="../../assets/img/personal.png" @click="$router.push('/customer/mobile/personal')"alt=""> -->
      </span>
      <span class="right" v-else></span>
    </div>
    <div class="mobileBody" :class="{noMargin: noHeader}">
      <router-view v-if="!loading" @setHeader="setHeader"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Layout',
  data () {
    let name = "兰博",noHeader = false
    try {
      name = this.$router.history.current.name
      noHeader = this.$router.history.current.meta.noHeader
    } catch (e) { } finally { }
    return {
      name,
      noHeader,
      showRight: true
    }
  },
  created () {
    this.loading = true
    // this.getProfile().then(success => {
    //   this.loading = false
    // })
  },
  watch: {
    $route (newVal) {
      this.name = newVal.name
      this.showRight = true
      this.noHeader = newVal.meta.noHeader
      this.$utils.loading.close();
    },
  },
  methods: {
    setHeader (data) {
      Object.assign(this, data)
    }
  },
}
</script>
<style scoped lang="less">
@import "../base.less";
.layout {
  font-size: @fs-n;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: @space-10;
  background: white;
  font-size: @fs-l;
  >* {
    text-align: center;
    flex: 1;
  }
  .left {
    text-align: left;
    >img {
      box-sizing: content-box;
      height: 16px;
      padding: 0 @space-5;
    }
  }
  .right {
    text-align: right;
    >img {
      box-sizing: content-box;
      height: 16px;
      padding: 0 @space-5;
    }
  }
}
.mobileBody {
  position: absolute;
  top: 43px;
  left: 0;
  bottom: 0;
  height: calc(100% - 43px);
  width: 100%;
  overflow: auto;
}
.noMargin {
  top: 0;
  height: 100%;
}
</style>
