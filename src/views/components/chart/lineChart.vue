<template>
  <div class="pr">
    <div ref="chart" :style="{height:height}"/>
  </div>
</template>

<script>
import * as echarts from 'echarts'

require('./chartTheme') // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    height: {
      type: String,
      default: '380px'
    }
  },
  data () {
    return {
      chart: null,
      times: null,
      flage: 0
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        setTimeout(() => this.setOptions(this.data), 4000)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
    var _this = this
    window.addEventListener('resize', function () {
      if (_this.chart) {
        _this.resizeTimer = setTimeout(function () {
          _this.chart.resize()
        }, 100)
      }
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    clearInterval(this.times)
  },
  methods: {
    /**
     * 十六进制颜色转换为带透明度的颜色
     * @param _color 十六进制颜色
     * @param _opactity 透明度
     * @returns {string} rgba
     */
    hexToRGBA (_color, _opacity) {
      let sColor = _color.toLowerCase()
      // 十六进制颜色值的正则表达式
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
      // 如果是16进制颜色
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          let sColorNew = '#'
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
          }
          sColor = sColorNew
        }
        // 处理六位的颜色值
        const sColorChange = []
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return 'rgba(' + sColorChange.join(',') + ',' + _opacity + ')'
      }
      return sColor
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart, 'customed')
      this.setOptions(this.data)
    },
    setOptions (data) {
      const legendData = []
      const seriesData = []
      const yAxis = []
      const dataZoom = []
      const grid = {}
      const _this = this
      let legendOP = {}
      if (!data) {
        return
      }
      data.data.forEach(function (item) {
          legendData.push(item.name)
        

        if (item.type === 'line' && item.lineStyle) {
          seriesData.push({
            name: item.name,
            yAxisIndex: item.yIndex,
            symbolSize: item.symbolSize,
            symbol: 'emptyCircle',
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 13, // 字体大小
                    color: '#ffffff'// 字体颜色
                  }
                },

                color: _this.hexToRGBA(item.color[0], 1),
                shadowBlur: 10,
                shadowColor: _this.hexToRGBA(item.color[0], 1),
                opacity: 1,

                // borderColor: 'red', // 拐点边框颜色
                lineStyle: {
                  // width: 5, // 设置线宽
                  type: item.lineStyle // 'dotted'虚线 'solid'实线
                }
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1
              }
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: item.color[0] // 0% 处的颜色
                }, {
                  offset: 1, color: item.color[1] // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              width: 2,
              type: item.lineStyle
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: item.areaColor[0] // 0% 处的颜色
                }, {
                  offset: 1, color: item.areaColor[1] // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            smooth: false,
            type: 'line',
            data: item.value
          })
        } else if (item.type === 'bar') {
          seriesData.push(
            {
              name: item.name,
              yAxisIndex: item.yIndex,
              barMaxWidth: item.barWidth,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: item.color[0] // 0% 处的颜色
                  }, {
                    offset: 1, color: item.color[1] // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                opacity: '1'
              },
              type: 'bar',
              data: item.value
            }
          )
          if (data.data[0].value.length > 10) {
            dataZoom.push({
              type: 'inside',
              show: true,
              bottom: 20,
              xAxisIndex: [0],
              start: 0,
              end: 50,
              height: 8,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#d3dee5'
              },
              textStyle: { color: '#fff' },
              borderColor: '#90979c'
            })
          }
        }
      })
      data.unit.forEach(function (item) {
        yAxis.push({
          min: item.min,
          minInterval: item.minInterval,
          max: item.max,
          show: true,
          name: item.name,
          nameGap: 15,
          position: item.position,
          splitNumber: 4,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true
          }
        })
      })
      grid.left = 10
      grid.right = 10
      grid.bottom = 0
      grid.top = data.title === '' ? 35 : 65
      grid.containLabel = true
      legendOP = {
        data: legendData,
        right: '0',
        top: data.title === '' ? 0 : 30,
        itemWidth: 16,
        itemHeight: 8,
        width: '100%'
      }
      var option = {
        title: {
          show: data.title !== '',
          text: data.title,
          left: 'center',
          top: 0,
          textStyle: {
            fontSize: 16,
            color: '#beeaff'
          }
        },
        xAxis: {
          data: data.xData,
          boundaryGap: false,
          axisLabel: {
            rotate: 50,
            textStyle: {
              color: '#FFFFFF'
            }
          }
        },
        dataZoom: dataZoom,
        grid: grid,
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            var htmlStr = ''
            var valMap = {}
            for (var i = 0;i < params.length;i++) {
              var param = params[i]
              var xName = param.name// x轴的名称
              var seriesName = param.seriesName// 图例名称
              var value = param.value// y轴值
              var color = param.color// 图例颜色

              // 过滤无效值
              if (value === '-') {
                continue
              }

              // 过滤重叠值
              if (valMap[seriesName] === value) {
                continue
              }

              if (i === 0) {
                htmlStr += xName + '<br/>'// x轴的名称
              }
              htmlStr += '<div>'
              // 为了保证和原来的效果一样，这里自己实现了一个点的效果
              htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>'

              // 圆点后面显示的文本
              htmlStr += seriesName + '：' + value

              htmlStr += '</div>'
              valMap[seriesName] = value
            }
            return htmlStr
          }
        },
        graphic: {
          elements: [
            {
              type: 'image',
              left: 40,
              right: 0,
              bottom: 20,
              silent: true,
              style: {
                image: require('@/assets/lineChartBg.svg'),
                height: data.barBgWidth ? data.barBgWidth : 33
              }
            }
          ]
        },
        yAxis: yAxis,
        legend: legendOP,
        series: seriesData
      }
      this.chart.setOption(option)
      if (data.data[0].value.length > 10 && this.flage === 0) {
        this.flage++
        this.times = setInterval(() => {
          // 每次向后滚动一个，最后一个从头开始。
          if (option.dataZoom[0].end >= 100) {
            option.dataZoom[0].end = 50
            option.dataZoom[0].start = 0
          } else {
            option.dataZoom[0].end = option.dataZoom[0].end + parseInt(100 / data.data[0].value.length)
            option.dataZoom[0].start = option.dataZoom[0].start + parseInt(100 / data.data[0].value.length)
          }
          this.chart.setOption(option)
        }, 5000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.opWarp{
  position: absolute;
  left: 0;
  top:0;
  z-index: 100;
}
.opLineBox{
  display: inline-block;
  border:1px solid #dfdfdf;
  height: 26px;
  padding: 0 12px;
  vertical-align: middle;
  line-height: 28px;
  margin-left: 10px;
  border-radius: 4px;
  position: relative;
  /deep/ .el-checkbox{
    position: relative;
    &:after{
      content: '';
      display: inline-block;
      position: absolute;
      width: 1px;
      height: 16px;
      background: #e9e9e9;
      right: -15px;
      top:5px;
    }
    &:last-child{
      &:after{
        display: none;
      }
    }
  }
  &:after{
    content: '';
    display: inline-block;
    position: absolute;
    width: 1px;
    height: 16px;
    background: #e9e9e9;
    right: -15px;
    top:5px;
  }
}
</style>
