<template>
  <div class="popup" v-if="visible">
    <div class="bg" @click="$emit('input')"></div>
    <div v-if="type == 'pop'" class="pop" :class="{animation: animation,bottom: animate == 'bottom',left: animate == 'left',right: animate == 'right'}">
      <div class="close"> </div>
      <slot></slot>
    </div>
    <div v-if="type == 'dialog'" class="dialog" :class="{animation: animation}">
      <div class="close" @click="$emit('input')"> </div>
      <!-- <div class="title" v-if="title">
        {{title}}
      </div> -->
      <slot></slot>
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
      default: "top",
    },
    title: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      visible: false,
      animation: false,
      animationTime: 300,// 提前结束  不卡顿
    };
  },
  watch: {
    value (newVal) {
      if (newVal) {
        this.setData({visible: true});
        // 延时执行，确保加载完dom
        setTimeout(() => {
          this.setData({animation: true});
        },30)
      } else {
        this.setData({animation: false});
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
@import "../../base.less";

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
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    min-height: 100px;
    border-radius: @radius;
    background: white;
    transition: transform .3s;
    opacity: .3;
    transform: translateY(-50%) scale(0);
    &.animation {
      opacity: 1;
      transform: translateY(-50%) scale(1);
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
    &.animation {
      transform: translateX(0);
    }
  }
  .title {
    position: relative;
    text-align: center;
    font-size: @fs-l;
    padding-top: 5px;
  }
  @iconHeight: 14px;
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: @iconHeight;
    height: @iconHeight;
    &::before {
      position: absolute;
      top: @iconHeight/2;
      left: 0;
      display: block;
      content: " ";
      transform: rotate(50deg);
      width: @iconHeight;
      height: 2PX;
      border-radius: 2PX;
      background: #666;
    }
    &::after {
      position: absolute;
      top: @iconHeight/2;
      left: 0;
      display: block;
      content: " ";
      transform: rotate(-50deg);
      width: @iconHeight;
      height: 2PX;
      border-radius: 2PX;
      background: #666;
    }
  }
</style>
