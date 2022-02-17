<template>
  <div class="pr">
    <div class="legendOp">
      <div class="text-center mt-5">问题小区占比(%)</div>
      <div class="pl-16">
        <div><i class="icon warning"></i>5G问题小区</div>
        <div><i class="icon info"></i>4G问题小区</div>
      </div>

    </div>
    <div ref="chart" :style="{height:height}"/>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import JSON from './map_xinjiang.json'
import JSONLine from './xinjiangLine.json'

export default {
  name: 'Home',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          legendList: ['5G问题小区占比', '4G问题小区占比'],
          data: [
            {
              name: '和田',
              value: [426, 124]
            },
            {
              name: '巴音郭楞蒙古自治州',
              value: [426, 124]
            },
            {
              name: '喀什地区',
              value: [432, 124]
            },
            {
              name: '克孜勒苏柯尔克孜自治州',
              value: [430, 124]
            },
            {
              name: '阿克苏地区',
              value: [564, 124]
            },
            {
              name: '吐鲁番市',
              value: [420, 124]
            },
            {
              name: '乌鲁木齐市',
              value: [667, 124]
            },
            {
              name: '哈密市',
              value: [487, 124]
            },
            {
              name: '伊犁哈萨克自治州',
              value: [426, 124]
            },
            {
              name: '昌吉回族自治州',
              value: [426, 124]
            },
            {
              name: '克拉玛依市',
              value: [426, 124]
            },
            {
              name: '博尔塔拉蒙古自治州',
              value: [426, 124]
            },
            {
              name: '塔城地区',
              value: [426, 124]
            },
            {
              name: '阿勒泰地区',
              value: [426, 124]
            }
          ]
        }
      }
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  data () {
    return {
      chart: null,
      geoCoordMap: {}
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    // this.getData()
    this.$nextTick(() => {
      this.initChart()
    })
    var _this = this
    window.addEventListener('resize', function () {
      if (_this.chart) {
        _this.resizeTimer = setTimeout(function () {
          // _this.chart.resize()
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
      this.chart = echarts.init(this.$refs.chart)
      this.setOptions(this.data)
    },
    formatData (data) {
      var data1 = []
      data.forEach(function (item, i) {
        data1 = []
        data1.push({
          name: item.name,
          value: item.value[0]
        })
      })
      return { data1 }
    },
    initBar (data) {
      var max = 100
      var _this = this
      if (!_this.chart) return
      var option = {
        xAxis: [],
        yAxis: [],
        grid: [],
        series: _this.chart.getOption().series
      }
      data.forEach(function (item) {
        if (item.value[0] > max) {
          max = item.value[0]
        }
      })
      echarts.util.each(data, function (dataItem, idx) {
        var geoCoord = _this.geoCoordMap[data[idx].name]
        var coord = _this.chart.convertToPixel('geo', geoCoord)
        idx += ''
        option.xAxis.push({
          id: idx,
          gridId: idx,
          type: 'category',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            onZero: false,
            show: false,
            lineStyle: {
              color: '#666'
            }
          },
          // data: xAxisCategory,
          data: ['站址总数'],
          zlevel: 100
        })
        option.yAxis.push({
          id: idx,
          gridId: idx,
          max: max,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#1C70B6'
            }
          },
          zlevel: 100
        })
        option.grid.push({
          id: idx,
          width: 100,
          height: 80,
          left: coord[0] - 50,
          top: coord[1] - 80,
          zlevel: 100
        })
        option.series.push(
          {
            id: idx,
            type: 'bar',
            name: dataItem.name,
            xAxisId: idx,
            yAxisId: idx,
            barWidth: 8,
            label: {
              show: true,
              position: 'top',
              offset: [0, 0],
              fontSize: 20,
              fontFamily: 'Agency-fb-bold'
            },
            barGap: '30%',
            data: [
              {
                name: '5G问题小区',
                value: dataItem.value[1],
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: '#fad55f' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#f7701f' // 0% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  borderRadius: 2
                },
                label: {
                  color: '#F38D36',
                  fontSize: 20,
                  fontWeight: 'bolder'
                }
              }
            ],
            zlevel: 9
          },
          {
            id: idx + dataItem.name,
            type: 'bar',
            name: dataItem.name,
            xAxisId: idx,
            yAxisId: idx,
            barWidth: 8,
            label: {
              show: true,
              position: 'top',
              offset: [0, 0],
              fontSize: 20,
              fontFamily: 'Agency-fb-bold'
            },
            barGap: '30%',
            data: [
              {
                name: '4G问题小区',
                value: dataItem.value[0],
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: '#00ffed' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#3f92ff' // 0% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  borderRadius: 2
                },
                label: {
                  color: '#00DCff',
                  fontSize: 20,
                  fontWeight: 'bolder'
                }
              }
            ],
            zlevel: 9
          }
        )
      })
      return option
    },
    setOptions (data) {
      var _this = this
      echarts.registerMap('map', JSON)
      echarts.registerMap('mapLine', JSONLine)
      _this.chart.hideLoading()
      const geoCoordMap = {}
      const mapFeatures = echarts.getMap('map').geoJson.features
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
      })
      this.geoCoordMap = geoCoordMap
      const bgGeo = []
      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].totalP + '%')
            })
          }
        }
        return res
      }
      for (var i = 0; i < 15; i++) {
        bgGeo.push(
          {
            map: 'mapLine',
            name: '背景色' + 'i',
            aspectScale: 1,
            zoom: 1.2,
            itemStyle: {
              areaColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              borderColor: '#001558',
              shadowBlur: 2,
              // shadowColor: 'rgba(' + (82 + (5 * i)) + ',' + (163 + (5 * i)) + ',' + (248 + i / 2) + ',1)',
              shadowColor: 'rgba(0,21,88,' + (1 - 0 * i) + ')',
              shadowOffsetX: 0,
              shadowOffsetY: 2 * i,
              opacity: 1
            },
            silent: true,
            zlevel: 1
          }
        )
      }
      var option = {
        tooltip: {
        },
        geo: [
          {
            show: true,
            map: 'map',
            aspectScale: 1,
            zoom: 1.2,
            silent: true,
            itemStyle: {
              areaColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              borderColor: '#0c58b2',
              opacity: 1
            },
            zlevel: 2
          },
          {
            show: true,
            map: 'mapLine',
            aspectScale: 1,
            zoom: 1.2,
            silent: true,
            itemStyle: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(53,122,193,.8)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(8,49,128,.3)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              borderWidth: 2,
              borderColor: '#17DBFF',
              opacity: 1
            },
            zlevel: 1
          },
          ...bgGeo
        ],
        visualMap: {
          show: true,
          type: 'piecewise',
          right: 55,
          bottom: 8,
          max: 100,
          seriesIndex: [0],
          align: 'left',
          inRange: {
            color: ['#A5DCF4', '#006edd']
          },
          textStyle: {
            color: '#beeaff'
          },
          pieces: [{
            min: data.stage[0].min,
            max: data.stage[0].max,
            label: data.stage[0].label,
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0,
              [{
                offset: 0,
                color: '#00d233'
              },
              {
                offset: 1,
                color: '#0c6561'
              }
              ]
            )
          }, {
            min: data.stage[1].min,
            max: data.stage[1].max,
            label: data.stage[1].label,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                offset: 0,
                color: '#002877'
              },
              {
                offset: 1,
                color: '#025af8'
              }
              ]
            )
          }, {
            min: data.stage[2].min,
            max: data.stage[2].max,
            label: data.stage[2].label,
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0,
              [{
                offset: 0,
                color: '#FFFF00' // 黄色
              },
              {
                offset: 1,
                color: '#5A5A00'
              }
              ]
            )
          }, {
            min: data.stage[3].min,
            max: data.stage[3].max,
            label: data.stage[3].label,
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0,
              [{
                offset: 0,
                color: '#ffa500'
              },
              {
                offset: 1,
                color: '#8d5d36'
              }
              ]
            )
          }, {
            min: data.stage[4].min,
            max: data.stage[4].max,
            label: data.stage[4].label,
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0,
              [{
                offset: 0,
                color: 'rgba(233,70,70,1)'
              },
              {
                offset: 1,
                color: 'rgba(233,70,70,0.3)'
              }
              ]
            )
          }]
        },
        series: [
          {
            type: 'map',
            mapType: 'map',
            geoIndex: 0,
            label: {
              show: false
            },
            data: Object.keys(this.geoCoordMap).map(name => {
              return {
                name: name,
                value: 1

              }
            })
          },
          {
            name: '问题小区占比',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.data),
            symbolSize: [28, 28],
            symbol: 'image://' + require('@/assets/mapDot.png'),
            symbolOffset: [0, 16],
            zlevel: 101,
            label: {
              formatter: '{b}',
              position: 'bottom',
              show: true,
              color: '#fff',
              fontSize: 16,
              offset: [0, -8],
              opacity: 1
            },
            itemStyle: {
              opacity: 1
            },
            encode: {
              tooltip: [2]
            }
          }
        ]
      }
      // console.log(data.data)
      option.series[0].data[0].value = parseFloat(data.data[0].totalP)
      option.series[0].data[1].value = parseFloat(data.data[1].totalP)
      // option.series[0].data[2].value = data.data[12] // 塔城
      option.series[0].data[2].value = parseFloat(data.data[2].totalP)
      option.series[0].data[3].value = parseFloat(data.data[3].totalP)
      option.series[0].data[4].value = parseFloat(data.data[4].totalP)
      option.series[0].data[5].value = parseFloat(data.data[5].totalP)
      option.series[0].data[6].value = parseFloat(data.data[6].totalP)
      option.series[0].data[7].value = parseFloat(data.data[7].totalP)
      option.series[0].data[8].value = parseFloat(data.data[8].totalP)
      option.series[0].data[9].value = parseFloat(data.data[9].totalP)
      option.series[0].data[10].value = parseFloat(data.data[10].totalP)
      option.series[0].data[11].value = parseFloat(data.data[11].totalP)
      option.series[0].data[12].value = parseFloat(data.data[12].totalP)
      option.series[0].data[13].value = parseFloat(data.data[13].totalP)
      option.series[0].data[14].value = parseFloat(data.data[14].totalP)
      option.series[0].data[15].value = parseFloat(data.data[15].totalP)
      _this.chart.setOption(option, true)
      _this.chart.setOption(_this.initBar(data.data))
    }
  }
}

</script>
<style scoped lang="scss">
.legendOp{
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: #beeaff;
  line-height: 24px;
  background: url("../../../assets/legendBg.png") no-repeat;
  width: 150px;
  height: 210px;
  .icon{
    display: inline-block;
    width: 15px;
    height: 9px;
    border-radius: 5px;
    background: #f00;
    margin-right: 8px;
    margin-left: 4px;
  }
  .warning{
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f79f04+0,82583c+100 */
    background: rgb(247,159,4); /* Old browsers */
    background: -moz-linear-gradient(top,  rgba(247,159,4,1) 0%, rgba(130,88,60,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(247,159,4,1) 0%,rgba(130,88,60,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(247,159,4,1) 0%,rgba(130,88,60,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f79f04', endColorstr='#82583c',GradientType=0 ); /* IE6-9 */
  }
  .info{
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#00ffed+0,3f92ff+100 */
    background: rgb(0,255,237); /* Old browsers */
    background: -moz-linear-gradient(top,  rgba(0,255,237,1) 0%, rgba(63,146,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(0,255,237,1) 0%,rgba(63,146,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(0,255,237,1) 0%,rgba(63,146,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffed', endColorstr='#3f92ff',GradientType=0 ); /* IE6-9 */
  }
}
</style>
