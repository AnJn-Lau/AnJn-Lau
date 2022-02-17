<template>
  <div class="home containerWarp">
    <!-- 页面1 -->
    <el-button class="qiehuan buttonDiv" @click="flag = !flag">切换页面</el-button>
    <el-tag class="dataTime">{{dataTime}}</el-tag>
    <transition name="lc" v-if="!flag">
    <div>
      <el-row :gutter="16" class="mb-16">
      <el-col :span="6" v-for="(item, k) in dataCard" :key="k">
        <div class="topDataCard">
          <i class="lineTop"></i><i class="lineBottom"></i>
          <div class="inner">
            <div class="item">
              <div class="icon"><img :src="item.icon" alt=""></div>
              <div class="name">{{ item.name }}</div>
            </div>
            <div><b class="data">{{item.value}}</b><span class="tip">{{item.unit}}</span></div>
            <div>
              <div class="f-18">同比</div>
              <div class="item ratio" :class="item.status">{{item.ratio}}%<i :class="item.status==='up'?'el-icon-top':'el-icon-bottom'"></i></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6">
        <!--地市业务量-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">地市业务量(时)</span>
          </div>
          <div class="mt-10">
            <div class="datath avgLayout">
              <div class="item">地市</div>
              <div class="item">2G话务量 <div>(万Erl)</div></div>
              <div class="item">4G话务量<div>(万Erl)</div></div>
              <div class="item">4G流量<div>(TB)</div></div>
              <div class="item">5G流量<div>(TB)</div></div>
            </div>
            <div class="datatd avgLayout" v-for="(item, k) in LocalBusinessVolume" :key="k">
              <div class="item">{{ item.label }}</div>
              <div class="item data">{{ item.data[0] }}</div>
              <div class="item data">{{ item.data[1] }}</div>
              <div class="item data">{{ item.data[2] }}</div>
              <div class="item data">{{ item.data[3] }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <!--4G流量趋势-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle" >4G流量趋势(日)</span>
          </div>
          <div class="cardBody">
            <lineChart :height="'340px'" :data="ll4GList"></lineChart>
          </div>
        </el-card>
        <!--4G话务量趋势-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">4G话务量趋势(日)</span>
          </div>
          <div class="cardBody">
            <lineChart :height="'340px'" :data="hw4GList"></lineChart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <!--5G流量趋势-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">5G流量趋势(日)</span>
          </div>
          <div class="cardBody">
            <lineChart :height="'340px'" :data="ll5GList"></lineChart>
          </div>
        </el-card>
        <!--2G话务量趋势-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">2G话务量趋势(日)</span>
          </div>
          <div class="cardBody">
            <lineChart :height="'340px'" :data="hw2GList"></lineChart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
    </transition>

    <!-- 页面2 -->
    <transition>
      <el-row :gutter="16" class="mb-16">
      <el-col :span="24" >
        <div>
          <page2 name="lc" v-show="flag"></page2>
        </div>
      </el-col>
    </el-row>
    </transition>

  </div>
</template>

<script>
import lineChart from './components/chart/lineChart'
import * as dayjs from 'dayjs'
import param from '../config/indexTable'
import page2 from './page2.vue'
dayjs().format()
export default {
  name: 'Home',
  components: {
    lineChart,
    page2
  },
  data () {
    return {
      // 顶部统计
      dataCard: [
        {
          name: '2G话务量(时)',
          icon: require('@/assets/icon/2Ghwl.png'),
          value: 1090,
          unit: '(万Erl)',
          ratio: 74.2,
          status: 'up'
        },
        {
          name: '4G话务量(时)',
          icon: require('@/assets/icon/4Ghwl.png'),
          value: 2056,
          unit: '(万Erl)',
          ratio: 32.6,
          status: 'up'
        },
        {
          name: '4G流量(时)',
          icon: require('@/assets/icon/4Gll.png'),
          value: 2588,
          unit: '(TB)',
          ratio: 32.6,
          status: 'up'
        },
        {
          name: '5G流量(时)',
          icon: require('@/assets/icon/5Gll.png'),
          value: 2588,
          unit: '(TB)',
          ratio: 32.6,
          status: 'up'
        }
      ],
      // 地市业务量
      LocalBusinessVolume: [
        {
          label: '全疆',
          data: [67, 67, 67, 67]
        },
        {
          label: '阿克苏',
          data: [67, 67, 67, 67]
        },
        {
          label: '阿勒泰',
          data: [67, 67, 67, 67]
        },
        {
          label: '巴州',
          data: [67, 67, 67, 67]
        },
        {
          label: '博州',
          data: [67, 67, 67, 67]
        },
        {
          label: '昌吉',
          data: [67, 67, 67, 67]
        },
        {
          label: '哈密',
          data: [67, 67, 67, 67]
        },
        {
          label: '和田',
          data: [67, 67, 67, 67]
        },
        {
          label: '喀什',
          data: [67, 67, 67, 67]
        },
        {
          label: '克拉玛依',
          data: [67, 67, 67, 67]
        },
        {
          label: '克州',
          data: [67, 88, 67, 67]
        },
        {
          label: '奎屯',
          data: [67, 46, 67, 67]
        },
        {
          label: '石河子',
          data: [67, 67, 67, 67]
        },
        {
          label: '塔城',
          data: [67, 67, 67, 67]
        },
        {
          label: '吐鲁番',
          data: [67, 67, 67, 67]
        },
        {
          label: '乌鲁木齐',
          data: [67, 67, 67, 67]
        },
        {
          label: '伊犁',
          data: [67, 67, 67, 67]
        }
      ],
      // 4G流量趋势
      ll4GList: {
        title: '4G流量连续15天数据',
        xData: ['加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中'],
        unit: [{
          name: '单位:(TB)',
          position: 'left',
          min: 0
        }],
        data: [
          {
            name: '今年',
            value: [],
            yIndex: 0,
            color: ['#ffc000', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '去年',
            value: [],
            yIndex: 0,
            color: ['#20e771', '#20e771'],
            areaColor: ['rgba(32,231,113,.5)', 'rgba(32,231,113,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#ffc000', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          },
          {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.0)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          },
          {
            name: '预测',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.0)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          }
        ]
      },
      // 4G话务量趋势
      hw4GList: {
        title: '4G话务量连续15天数据',
        xData: ['加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中'],
        unit: [{
          name: '单位:(万Erl)',
          position: 'left',
          min: 0
        }],
        data: [
          {
            name: '今年',
            value: [],
            yIndex: 0,
            color: ['#ffc000', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '去年',
            value: [],
            yIndex: 0,
            color: ['#20e771', '#20e771'],
            areaColor: ['rgba(32,231,113,.5)', 'rgba(32,231,113,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#ffc000', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          },
          {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.0)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          },
          {
            name: '预测',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.0)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          }
        ]
      },
      // 2G话务量趋势
      hw2GList: {
        title: '2G话务量连续15天数据',
        xData: ['加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中'],
        unit: [{
          name: '单位:(万Erl)',
          position: 'left',
          min: 0
        }],
        data: [
          {
            name: '今年',
            value: [],
            yIndex: 0,
            color: ['#ffc000', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '去年',
            value: [],
            yIndex: 0,
            color: ['#20e771', '#20e771'],
            areaColor: ['rgba(32,231,113,.5)', 'rgba(32,231,113,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#ffc000', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          },
          {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.0)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          },
          {
            name: '预测',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.0)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          }
        ]
      },
      // 5G流量趋势
      ll5GList: {
        title: '5G流量连续15天数据',
        xData: ['加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中', '加载中'],
        unit: [{
          name: '单位:(TB)',
          position: 'left',
          min: 0
        }],
        data: [
          {
            name: '今年',
            value: [],
            yIndex: 0,
            color: ['#ffc000', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '去年',
            value: [],
            yIndex: 0,
            color: ['#20e771', '#20e771'],
            areaColor: ['rgba(32,231,113,.5)', 'rgba(32,231,113,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          },
          {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#FFC924', '#ffc000'],
            areaColor: ['rgba(255,192,0,.5)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          }, {
            name: '今年',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.0)', 'rgba(255,192,0,0.0)'],
            symbolSize: 6,
            lineStyle: 'dotted',
            type: 'line'
          },
          {
            name: '预测',
            value: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            yIndex: 0,
            color: ['#BC1616', '#ffc000'],
            areaColor: ['rgba(255,192,0,.2)', 'rgba(255,192,0,0.08)'],
            symbolSize: 6,
            lineStyle: 'solid',
            type: 'line'
          }
        ]
      },
      flage: 0,
      flage2: 14,
      index: 1,
      flag: true,
      lastFlag: true,
      lastFlag2: true,
      dataTime: [],
      ll4GListMin: 999999999999,
      ll5GListMin: 999999999999,
      hw4GListMin: 999999999999,
      hw2GListMin: 999999999999
    }
  },
  methods: {
    // 请求今年的数据
    drawPie () {
      const params = dayjs().add(7, 'day').format('YYYY-MM-DD').toString()

      let startTime = dayjs().add(8, 'day').format('YYYY-MM-DD').toString()
      startTime = { startTime: startTime }
      // console.log(startTime)
      this.$jsonp(param.url, {
        callbackQuery: 'jsonpCallback',
        reportId: 7890,
        fileName: 'dbreport_202201201721433264478.xml',
        datasetName: 'data',
        parameterConfig: JSON.stringify(startTime),
        start: 0,
        limit: 30
      }).then((res) => {
        this.ll5GList.data[0].value = []
        this.hw2GList.data[0].value = []
        this.hw4GList.data[0].value = []
        this.ll4GList.data[0].value = []
        res.rows.forEach((item, index) => {
          if (item.FOURLL < this.ll4GListMin) {
            this.ll4GListMin = item.FOURLL
          }
          if (item.FOURHW < this.hw4GListMin) {
            this.hw4GListMin = item.FOURHW
          }
          if (item.FIVEHW < this.hw2GListMin) {
            this.hw2GListMin = item.FIVEHW
          }
          if (item.FIVELL < this.ll5GListMin) {
            this.ll5GListMin = item.FIVELL
          }
          if (index < 7) {
            this.hw2GList.data[0].value[index] = item.FIVEHW
            this.ll5GList.data[0].value[index] = item.FIVELL
            this.hw4GList.data[0].value[index] = item.FOURHW
            this.ll4GList.data[0].value[index] = item.FOURLL
          } else if (index >= 7) {
            this.hw2GList.data[2].value[index] = item.FIVEHW
            this.ll5GList.data[2].value[index] = item.FIVELL
            this.hw4GList.data[2].value[index] = item.FOURHW
            this.ll4GList.data[2].value[index] = item.FOURLL

            this.hw2GList.data[3].value[index] = item.FIVEHW
            this.ll5GList.data[3].value[index] = item.FIVELL
            this.hw4GList.data[3].value[index] = item.FOURHW
            this.ll4GList.data[3].value[index] = item.FOURLL
          }
          if (index === 6) {
            this.hw2GList.data[2].value[6] = item.FIVEHW
            this.ll5GList.data[2].value[6] = item.FIVELL
            this.hw4GList.data[2].value[6] = item.FOURHW
            this.ll4GList.data[2].value[6] = item.FOURLL
          }
        })
      })
      this.getTime(params)
    },
    // 先根据今天的日期获取去年的日期，再调用请求如年方法，传入日期
    getTime (startTime) {
      const thisYear = { thisYear: startTime }
      // 查询有无对应春节阴历日期
      this.$jsonp(param.url, {
        callbackQuery: 'jsonpCallback',
        reportId: 7891,
        fileName: 'dbreport_202201201723578767871.xml',
        datasetName: 'data',
        parameterConfig: JSON.stringify(thisYear),
        start: 0,
        limit: 30
      }).then((res) => {
        if (this.flage === 0) {
          // 第一次先将正常日期填充，后边后边查询到库中包含对应阴历信息，再对数据进行替换
          this.ll5GList.xData[0] = this.hw2GList.xData[0] = this.hw4GList.xData[0] = this.ll4GList.xData[0] = dayjs(startTime).subtract(14, 'day').format('MM-DD')
          this.ll5GList.xData[1] = this.hw2GList.xData[1] = this.hw4GList.xData[1] = this.ll4GList.xData[1] = dayjs(startTime).subtract(13, 'day').format('MM-DD')
          this.ll5GList.xData[2] = this.hw2GList.xData[2] = this.hw4GList.xData[2] = this.ll4GList.xData[2] = dayjs(startTime).subtract(12, 'day').format('MM-DD')
          this.ll5GList.xData[3] = this.hw2GList.xData[3] = this.hw4GList.xData[3] = this.ll4GList.xData[3] = dayjs(startTime).subtract(11, 'day').format('MM-DD')
          this.ll5GList.xData[4] = this.hw2GList.xData[4] = this.hw4GList.xData[4] = this.ll4GList.xData[4] = dayjs(startTime).subtract(10, 'day').format('MM-DD')
          this.ll5GList.xData[5] = this.hw2GList.xData[5] = this.hw4GList.xData[5] = this.ll4GList.xData[5] = dayjs(startTime).subtract(9, 'day').format('MM-DD')
          this.ll5GList.xData[6] = this.hw2GList.xData[6] = this.hw4GList.xData[6] = this.ll4GList.xData[6] = dayjs(startTime).subtract(8, 'day').format('MM-DD')
          this.ll5GList.xData[7] = this.hw2GList.xData[7] = this.hw4GList.xData[7] = this.ll4GList.xData[7] = dayjs(startTime).subtract(7, 'day').format('MM-DD')
          this.ll5GList.xData[8] = this.hw2GList.xData[8] = this.hw4GList.xData[8] = this.ll4GList.xData[8] = dayjs(startTime).subtract(6, 'day').format('MM-DD')
          this.ll5GList.xData[9] = this.hw2GList.xData[9] = this.hw4GList.xData[9] = this.ll4GList.xData[9] = dayjs(startTime).subtract(5, 'day').format('MM-DD')
          this.ll5GList.xData[10] = this.hw2GList.xData[10] = this.hw4GList.xData[10] = this.ll4GList.xData[10] = dayjs(startTime).subtract(4, 'day').format('MM-DD')
          this.ll5GList.xData[11] = this.hw2GList.xData[11] = this.hw4GList.xData[11] = this.ll4GList.xData[11] = dayjs(startTime).subtract(3, 'day').format('MM-DD')
          this.ll5GList.xData[12] = this.hw2GList.xData[12] = this.hw4GList.xData[12] = this.ll4GList.xData[12] = dayjs(startTime).subtract(2, 'day').format('MM-DD')
          this.ll5GList.xData[13] = this.hw2GList.xData[13] = this.hw4GList.xData[13] = this.ll4GList.xData[13] = dayjs(startTime).subtract(1, 'day').format('MM-DD')
          this.ll5GList.xData[14] = this.hw2GList.xData[14] = this.hw4GList.xData[14] = this.ll4GList.xData[14] = dayjs(startTime).format('MM-DD')
          this.flage++
          this.getTime(startTime)
        } else if (this.flage2 >= 0) {
          if (res.rows.length !== 0) {
            // 库中含有对应日期，填充日期数据和 调用获取去年数据的方法(只调用一次，使用条件判断，调用过后更改条件)，并继续调用查询有误对应春节阴历日期方法查询前一天库中有无数据
            console.log('在春节期间')
            if (this.lastFlag2) {
              const lastParam = dayjs(res.rows[0].LASTYEAR).add(1, 'day').format('YYYY-MM-DD').toString()
              this.lastDrawPie(lastParam)
              this.lastFlag2 = false
            }
            startTime = dayjs(res.rows[0].THISYEAR).subtract(1, 'day').format('YYYY-MM-DD')

            this.ll5GList.xData[this.flage2] = this.hw2GList.xData[this.flage2] = this.hw4GList.xData[this.flage2] = this.ll4GList.xData[this.flage2] = res.rows[0].LUNAR_CALENDAR
          }
          this.flage2--
          this.getTime(startTime)
        } else {
          // 库中没有对应数据，调用获取去年数据的方法(只调用一次，使用条件判断，调用过后更改条件)
          if (this.lastFlag2) {
            this.lastFlag2 = false
            console.log('不在春节期间')
            const lastParam2 = dayjs().subtract(1, 'year').add(8, 'day').format('YYYY-MM-DD').toString()
            this.lastDrawPie(lastParam2)
          }
        }
      })
    },
    // 获取去年数据
    lastDrawPie (startTime) {
      console.log(startTime)
      startTime = { startTime: startTime }
      this.$jsonp(param.url, {
        callbackQuery: 'jsonpCallback',
        reportId: 7890,
        fileName: 'dbreport_202201201721433264478.xml',
        datasetName: 'data',
        parameterConfig: JSON.stringify(startTime),
        start: 0,
        limit: 30
      }).then((res) => {
        this.ll5GList.data[1].value = []
        this.hw2GList.data[1].value = []
        this.hw4GList.data[1].value = []
        this.ll4GList.data[1].value = []
        res.rows.forEach((item, index) => {
          // setTimeout(() => do someThing, 1000)
          item.FIVELL = Number(item.FIVELL)
          item.FOURHW = Number(item.FOURHW)
          item.FIVEHW = Number(item.FIVEHW)
          item.FOURLL = Number(item.FOURLL)
          this.ll5GList.data[1].value[index] = item.FIVELL
          if (item.FIVELL < this.ll5GListMin) {
            this.ll5GListMin = item.FIVELL
          }
          this.hw2GList.data[1].value[index] = item.FIVEHW
          if (item.FIVEHW < this.hw2GListMin) {
            this.hw2GListMin = item.FIVEHW
          }
          this.hw4GList.data[1].value[index] = item.FOURHW
          if (item.FOURHW < this.hw4GListMin) {
            this.hw4GListMin = item.FOURHW
          }
          this.ll4GList.data[1].value[index] = item.FOURLL
          if (item.FOURLL < this.ll4GListMin) {
            this.ll4GListMin = item.FOURLL
          }
        })
        // 图标y轴最小值
        this.ll4GList.unit[0].min = Math.ceil(this.ll4GListMin) - param.ll4GListTableMin
        this.ll5GList.unit[0].min = Math.ceil(this.ll5GListMin) - param.ll5GLisTabletMin
        this.hw4GList.unit[0].min = Math.ceil(this.hw4GListMin) - param.hw4GListTableMin
        this.hw2GList.unit[0].min = Math.ceil(this.hw2GListMin) - param.hw2GListTableMin
      })
    },
    // 顶栏+左侧
    getTotal () {
      this.$jsonp(param.url, param.homeTotal).then((res) => {
        res.rows.forEach((item, index) => {
          // 全疆数据填充，包括顶栏和左侧第一行
          if (item.CITY === '全疆') {
            this.dataCard[0].value = item.TWOH
            if (item.TWOHCHANGE < 0) {
              item.TWOHCHANGE = -(item.TWOHCHANGE)
              this.dataCard[0].status = 'down'
            }
            this.dataCard[0].ratio = item.TWOHCHANGE
            this.dataCard[1].value = item.FOURH
            if (item.FOURHCHANGE < 0) {
              item.FOURHCHANGE = -(item.FOURHCHANGE)
              this.dataCard[1].status = 'down'
            }
            this.dataCard[1].ratio = item.FOURHCHANGE
            this.dataCard[2].value = item.FOURFLOW
            if (item.FOURFLOWCHANGE < 0) {
              item.FOURFLOWCHANGE = -(item.FOURFLOWCHANGE)
              this.dataCard[2].status = 'down'
            }
            this.dataCard[2].ratio = item.FOURFLOWCHANGE
            this.dataCard[3].value = item.FIVEFLOW
            if (item.FIVEFLOWCHANGE < 0) {
              item.FIVEFLOWCHANGE = -(item.FIVEFLOWCHANGE)
              this.dataCard[3].status = 'down'
            }
            this.dataCard[3].ratio = item.FIVEFLOWCHANGE
            this.LocalBusinessVolume.label = item.CITY
            this.setTotal(item, 0)
            // this.index++
          } else {
            // 左侧列表数据填充
            switch (item.CITY) {
              case '阿克苏':
                this.setTotal(item, 1)
                break
              case '阿勒泰':
                this.setTotal(item, 2)
                break
              case '巴州':
                this.setTotal(item, 3)
                break
              case '博州':
                this.setTotal(item, 4)
                break
              case '昌吉':
                this.setTotal(item, 5)
                break
              case '哈密':
                this.setTotal(item, 6)
                break
              case '和田':
                this.setTotal(item, 7)
                break
              case '喀什':
                this.setTotal(item, 8)
                break
              case '克拉玛依':
                this.setTotal(item, 9)
                break
              case '克州':
                this.setTotal(item, 10)
                break
              case '奎屯':
                this.setTotal(item, 11)
                break
              case '石河子':
                this.setTotal(item, 12)
                break
              case '塔城':
                this.setTotal(item, 13)
                break
              case '吐鲁番':
                this.setTotal(item, 14)
                break
              case '乌鲁木齐':
                this.setTotal(item, 15)
                break
              case '伊犁':
                this.setTotal(item, 16)
                break
              default:
                break
            }
          }
        })
      })
    },
    times () {
      return setInterval(() => {
        const num2 = Number(dayjs().format('m').toString())
        if (num2 === 6) {
          location.reload()
        }
      }, 60000)
    },
    times2 () {
      return setInterval(() => {
        this.flag = !this.flag
      }, 300000)
    },
    setTotal (item, index) {
      this.LocalBusinessVolume[index].data[0] = item.TWOH
      this.LocalBusinessVolume[index].data[1] = item.FOURH
      this.LocalBusinessVolume[index].data[2] = item.FOURFLOW
      this.LocalBusinessVolume[index].data[3] = item.FIVEFLOW
    }
  },
  mounted () {
    const num = Number(dayjs().format('m').toString())
    if (num > 5) {
      this.dataTime = dayjs().subtract(2, 'hour').format('YYYY-MM-DD, HH').toString() + '-' + dayjs().subtract(1, 'hour').format('HH').toString() + '点的数据'
    } else {
      this.dataTime = dayjs().subtract(3, 'hour').format('YYYY-MM-DD, HH').toString() + '-' + dayjs().subtract(3, 'hour').format('HH').toString() + '点的数据'
    }
    this.drawPie()
    this.getTotal()
    this.times() // 加载定时任务
    this.times2()
  },
  destroyed () {
    clearInterval(this.times)
    clearInterval(this.times2)
  }
}
</script>
<style lang="scss" scoped>
.lc-enter,.lc-leave-to{//进入前，离开后
        opacity: 0;
    }
    .lc-enter-to,.lc-leave{//进入后，离开前
        opacity: 1;
    }
    .lc-enter-active,.lc-leave-active{
        transition: all 1s;
    }
    .qiehuan{
      float: right;
      position: absolute;
      z-index: 50px;
      margin-top: -40px;
      background-color: #02216D;
      color: #00D1FF;
      border: 1px solid #01539E;
    }
    .dataTime{
      float: right;
      position: absolute;
      margin-top: -58px;
      margin-left: 1320px;
      background-color: rgba(220,38,38,0);
      color: #00D1FF;
      border:1px solid #397ED6;
      font-size: 22px;

    }
    /*鼠标点击后移开，恢复本身样式*/
.buttonDiv, .buttonDiv:focus:not(.buttonDiv:hover){
    margin-right: 12px;
    border: 1px solid #02216D;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 #02216D;
    color: #2794f8;
    background: #02216D;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonDiv:focus, .buttonDiv:hover{
    background: #02216D;
    border: 1px solid #02216D !important;
    color: white;
}
/*鼠标按下，没有抬起*/
.buttonDiv:active {
    background: #010E3B;
    color: #2794f8;
}

</style>
