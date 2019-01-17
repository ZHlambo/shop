<template>
  <ul class="filterContainer">
    <li :class="{active: current == undefined ? index == now : current == item.value}" v-for="(item, index) in dataSource" :key="index">
      <span :class="{descIcon: item.order === 'desc',ascIcon: item.order === 'asc', unUse: item.order === 'unUse'}"  @click="clickItem(index, item)">{{item.name || item}}</span>
      <!-- {{item.order}} -->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FilterView',
  props: ['dataSource', "current"],
  data () {
    return {
      now: 0
    }
  },
  methods: {
    clickItem (index, item) {
      this.now = index
      this.$emit('changeFilter', {
        index,
        item
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../base.less";

.filterContainer {
    display: flex;
    align-items: center;
    font-size: @fs-n;
    font-weight: bold;
    line-height: 80/2px;

    > li {
        flex: 1;
        text-align: center;
        padding: @space-10 @space-20;
        color: @color-99;
        position: relative;
        >span {
          cursor: pointer;
        }
        &.active {
            color: @color-33;
        }
    }
    .descIcon {
      position: relative;
      &::after, &::before {
        position: absolute;
        z-index: 1;
        display: block;
        content: " ";
        width:0;
        height:0;
      }
      &::before {
        top: 12px;
        right: -12px;
        border: 5px solid transparent;
        border-top: 5px solid #ddd;
      }
      &::after {
        top: -2px;
        right: -12px;
        border: 5px solid transparent;
        border-bottom: 5px solid #999;
      }
    }
    .ascIcon {
      position: relative;
      &::after, &::before {
        position: absolute;
        z-index: 1;
        display: block;
        content: " ";
        width:0;
        height:0;
      }
      &::before {
        top: 12px;
        right: -12px;
        border: 5px solid transparent;
        border-top: 5px solid #999;
      }
      &::after {
        top: -2px;
        right: -12px;
        border: 5px solid transparent;
        border-bottom: 5px solid #ddd;
      }
    }
    .unUse {
      position: relative;
      &::after, &::before {
        position: absolute;
        z-index: 1;
        display: block;
        content: " ";
        width:0;
        height:0;
      }
      &::before {
        top: 12px;
        right: -12px;
        border: 5px solid transparent;
        border-top: 5px solid #ddd;
      }
      &::after {
        top: -2px;
        right: -12px;
        border: 5px solid transparent;
        border-bottom: 5px solid #ddd;
      }
    }
}
</style>
