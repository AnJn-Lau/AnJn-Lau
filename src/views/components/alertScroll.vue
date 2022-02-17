<template>
  <div class="scrollWarp" :style="{height: height}">
    <ul class="item">
      <li v-for="(item, index) in data" :key="index">
        <a href="#">
          <span class="title" v-text="item.title"></span>
          <vue-seamless-scroll
            :data="item.data"
            :class-option="classOption"
            class="warp"
          >
            <ul class="ul-item">
              <li class="li-item" v-for="(c, k) in item.data" :key="k">
                <span class="mr-16">{{ c.name }}</span>
                <span class="mr-16">利用率:{{ c.rate }}%</span>
                <span>流量:{{ c.value }}{{c.unit}}</span>
              </li>
            </ul>
          </vue-seamless-scroll>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'alertScroll',
  components: {
    vueSeamlessScroll
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [{
          title: '4G高负荷预警小区TOP10',
          data: [
            {
              name: '某某某某小区',
              rate: 80,
              value: 5670,
              unit: 'TB'
            },
            {
              name: '某某某某小区',
              rate: 80,
              value: 5670,
              unit: 'TB'
            },
            {
              name: '某某某某小区',
              rate: 80,
              value: 5670,
              unit: 'TB'
            }
          ]
        }, {
          title: '5G高负荷预警小区TOP10',
          data: [
            {
              name: '某某某某小区',
              rate: 80,
              value: 5670,
              unit: 'TB'
            },
            {
              name: '某某某某小区',
              rate: 80,
              value: 5670,
              unit: 'TB'
            },
            {
              name: '某某某某小区',
              rate: 80,
              value: 5670,
              unit: 'TB'
            }
          ]
        }]
      }
    },
    height: {
      type: String,
      default: '105px'
    }
  },
  data () {
    return {
      classOption: {
        limitMoveNum: 3,
        direction: 2
      }
    }
  }
}
</script>

<style scoped lang="scss">
.scrollWarp {
  overflow: hidden;
  >ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li{
      margin-bottom: 15px;
      a {
        height: 45px;
        line-height: 45px;
        background: url("../../assets/scrollAlertBg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        color: #fff;
        padding: 0 16px;
        text-decoration: none;
      }
    }
  }
}
.warp {
  flex: 1;
  overflow: hidden;
  margin-left: 20px;
  white-space: nowrap;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    &.ul-item {
      display: flex;
      .li-item {
        margin-left: 30px;
        width: 30%;
        color: #beeaff;
        text-align: center;
        font-size: 16px;
        position: relative;
        &:before{
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          background: #00d1ff;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
