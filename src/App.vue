<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import "./views/base.less";

body,html {
  margin: 0;
  padding: 0;
  color: @color-33;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
ul, li, input, textarea, button {
  padding: 0;
  margin: 0;
  list-style: none;
  line-height: normal;
  border: 0;
  outline: none;
}

* {
  box-sizing: border-box;
}


.bodyToast {
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5PX;
  padding: 10PX 10PX;
  transition: opacity .3s;
  opacity: 1;

  &.dismiss {
    opacity: 0;
  }

}
#bodyLoading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  >div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10PX;
    padding: 15PX;
    &::after {
      display: block;
      content: " ";
      height: 32PX;
      width: 32PX;

      -moz-animation: my-rotate 0.8s infinite linear;
      -o-animation: my-rotate 0.8s infinite linear;
      -ms-animation: my-rotate 0.8s infinite linear;
      -webkit-animation: my-rotate 0.8s infinite linear;
      animation: my-rotate 0.8s infinite linear;
      border: 0.25rem solid transparent;
      border-top-color: rgb(204, 204, 204);
      border-left-color: rgb(204, 204, 204);
      border-bottom-color: rgb(204, 204, 204);
      border-radius: 50%;
    }
  }
}
@keyframes my-rotate {
  form {
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
