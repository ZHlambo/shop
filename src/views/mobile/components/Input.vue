<template>
   <div class="inputView">
     <input :type="type" name="" :value="value" :placeholder="placeholder" :maxlength="maxlength" @input="input">
     <span class="inputRight">
       <slot name="right"></slot>
     </span>
   </div>
</template>

<script>

export default {
  name: 'Input',
  props: ['type', 'value', 'placeholder', "maxlength"],
  data () {
    return {
    }
  },
  methods: {
    input (e) {
      this.$emit("update:value", e.target.value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../base.less";

.inputView {
  position: relative;
  .inputRight {
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}

input {
  width: 100%;
  font-size: 14px;
  border-bottom: 1px solid @color-99;
  padding-right: @space-40;
  padding: @space-20 0;
  &:focus {
    border-bottom-color: @color-33;
  }
}

</style>
