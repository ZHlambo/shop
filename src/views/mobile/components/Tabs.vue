<template>
  <div class="">
    <ul class="filterContainer">
      <li v-for="(item, index) in dataSource" :key="index" :class="{active: current === index}" @click="changeItem(index)">
        <span :class="{descIcon: item.order === 'desc',ascIcon: item.order === 'asc', unUse: item.order === 'unUse'}"  @click="changeItem(index, item)">{{item.label || item}}</span>
        <!-- {{item.order}} -->
      </li>
    </ul>
    <div>
      <slot v-for="(data, index) in dataSource" :name="data.name" v-if="dataSource[current].name === data.name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterView',
  data () {
    return {
      current: 0
    }
  },
  props: ['dataSource', 'options', 'value'],
  watch: {
    options (options) {
      if (options) {
        this.setData({...options});
      }
      return options;
    },
    dataSource (dataSource) {
      if (dataSource && dataSource.length > 0) {
        this.setData({current: 0});
      }
      return dataSource;
    },
    value (value) {
      if (value !== this.value) {
        for (let i = 0; i < this.dataSource.length; i++) {
          if (this.dataSource[i].name === value) {
            this.setData({current: i});
            break;
          }
        }
      }
      return value;
    }
  },
  mounted () {
  },
  methods: {
    changeItem (index) {
      this.$emit('input', {data: this.dataSource[index], index});
      this.setData({current: index});
    },
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
    line-height: 40px;

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
