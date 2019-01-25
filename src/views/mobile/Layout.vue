<template>
  <div class="layout">
    <!-- <div v-if="!noHeader" class="header border-bottom">
      <span class="left"> </span>
      <span>{{name}}</span>
      <span class="right" v-if="showRight">
      </span>
      <span class="right" v-else></span>
    </div> -->
    <div class="mobileBody">
      <router-view @setHeader="setHeader"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MobileLayout',
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
      document.title = newVal.name
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
  align-items: center;
  padding: @space-10;
  background: white;
  font-size: @fs-l;

  >* {
    text-align: center;
    flex: 1;
  }
  .left {
    // text-align: left;
    &::after {
      display: block;
      content: " ";
      width: 10px;
      height: 10px;
      border: 2px solid;
      border-color: transparent transparent @color-33 @color-33;
      transform: rotate(45deg);
      // transform: rotate3d(1, -1, 0, 45deg);
      border-radius: 2px;
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
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #f2f5f7;
}
</style>
