<template>
  <div class="popup" v-if="visible">
    <div class="bg" @click="$emit('input')">{{visible+ animate}}</div>
    <div v-if="type == 'pop'" class="pop" :class="{animationShow: animationShow,bottom: animate == 'bottom',left: animate == 'left',right: animate == 'right'}">
      {{type}}
    </div>
    <div v-if="type == 'dialog'" class="dialog" :class="{animationShow: animationShow,bottom: animate == 'bottom',left: animate == 'left',right: animate == 'right',top: animate == 'top'}">
      {{type}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // TODO: dropdown
    type: {// enum: pop dialog dropdown
      type: String,
      default: "pop",
    },
    animate: {// enum: bottom left right
      type: String,
      default: "bottom",
    }
  },
  data () {
    return {
      visible: false,
      animationShow: false,
      animationTime: 300,// 提前结束  不卡顿
    };
  },
  watch: {
    value (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.setData({animationShow: true});
        },0)
        this.setData({visible: true});
      } else {
        this.setData({animationShow: false});
        setTimeout(() => {
          this.setData({visible: false,});
        }, this.animationTime)
      }
      return newVal;
    },
  }
}
</script>

<style scoped lang="less">
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
    }
  }
  .dialog {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 100px;
    border-radius: 5px;
    background: white;
    transition: transform .3s;
    opacity: .3;
    &.top {
      transform: translateY(-20px);
    }
    &.bottom {
      transform: translateY(20px);
    }
    &.left {
      transform: translateX(20px);
    }
    &.right {
      transform: translateX(-20px);
    }
    &.animationShow {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    height: 300px;
    transition: transform .3s;
    &.bottom {
      transform: translateY(100%);
    }
    &.left {
      transform: translateX(100%);
    }
    &.right {
      transform: translateX(-100%);
    }
    &.animationShow {
      transform: translateX(0);
    }

  }
</style>
