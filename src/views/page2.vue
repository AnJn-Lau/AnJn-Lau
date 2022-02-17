<template>
  <div class="home containerWarp">
    <el-row :gutter="8" class="mb-16">
      <el-col :span="1">
        <div class="topDataCard text-center">
          <i class="lineTop"></i><i class="lineBottom"></i>
          <div class="inner">
            <span></span>
            问<br>题<br>小<br>区
            <span></span>
          </div>
        </div>
      </el-col>
      <el-col :span="23">
        <ul class="col col5">
          <!-- 问题小区 循环遍历dataCard-->
          <li v-for="(item, k) in dataCard" :key="k">
            <div class="topDataCard pl-0 pr-8">
              <i class="lineTop"></i><i class="lineBottom"></i>
              <div class="inner">
                <div class="item">
                  <div class="icon text-center">
                    <img :src="item.icon" alt="" width="100px" style="margin-top: -20px">
                    <div class="name ml-0" style="margin-top: -15px">{{ item.name }}</div>
                  </div>
                </div>
                <div>
                  <div class="item">4G<b class="data ml-4 mr-4 f-30">{{item.value[0]}}</b><span class="tip ml-0">{{item.unit[0]}}</span></div>
                  <div class="item">5G<b class="data ml-4 mr-4 f-30">{{item.value[1]}}</b><span class="tip ml-0">{{item.unit[1]}}</span></div>
                </div>
                <div>
                  <div class="item">
                    <span>环比：</span><div class="ratio f-18" :class="item.status[0]">{{item.ratio[0]}} 个<span class="tip"></span><i :class="item.status[0]==='up'?'el-icon-top':'el-icon-bottom'"></i></div>
                  </div>
                  <div class="item mt-12">
                    <span>环比：</span><div class="ratio f-18" :class="item.status[1]">{{item.ratio[1]}} 个<span class="tip"></span><i :class="item.status[1]==='up'?'el-icon-top':'el-icon-bottom'"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6">
        <!--地市业务量-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">地市指标(时)</span>
          </div>
          <div class="mt-10" v-if="this.flage1%2 === 0">
            <div class="datath avgLayout">
              <div class="item">地市</div>
              <div class="item">4G接通率 <div>(%)</div></div>
              <div class="item">4G掉线率<div>(%)</div></div>
              <div class="item">5G接通率<div>(%)</div></div>
              <div class="item">5G掉线率<div>(%)</div></div>
            </div>
            <div class="datatd avgLayout" v-for="(item, k) in LocalBusinessVolume1" :key="k">
              <div class="item data" style="font-size: 16px">{{ item.label }}</div>
              <div class="item data"  :style="{'color': item.color[0]}">{{ item.data[0] }}</div>
              <div class="item data" :style="{'color': item.color[1]}">{{ item.data[1] }}</div>
              <div class="item data" :style="{'color': item.color[2]}">{{ item.data[2] }}</div>
              <div class="item data" :style="{'color': item.color[3]}">{{ item.data[3] }}</div>
            </div>
          </div>
          <div class="mt-10" v-if="this.flage2%2 === 0">
            <div class="datath avgLayout">
              <div class="item">地市</div>
              <div class="item">VoLTE接通率 (%)</div>
              <div class="item">VoLTE掉线率(%)</div>
              <div class="item">4G故障基站数(个)</div>
              <div class="item">5G故障基站数(个)</div>
            </div>
            <div class="datatd avgLayout" v-for="(item, k) in LocalBusinessVolume2" :key="k">
              <div class="item data" style="font-size: 16px">{{ item.label }}</div>
              <div class="item data" :style="{'color': item.color[0]}">{{ item.data[0] }}</div>
              <div class="item data" :style="{'color': item.color[1]}">{{ item.data[1] }}</div>
              <div class="item data">{{ item.data[2] }}</div>
              <div class="item data">{{ item.data[3] }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="13">
        <!--4G流量趋势-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">全疆问题小区(时)</span>
          </div>
          <div class="cardBody">
            <Map :height="'575px'" ref="child" v-bind:data="chartData"/>
          </div>
        </el-card>
        <!--4G话务量趋势-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">预警(时)</span>
          </div>
          <div class="cardBody">
            <el-row :gutter="8" class="pr">
              <el-col :span="2">&nbsp;<div class="alertTitle"></div></el-col>
              <el-col :span="22">
                <alertScroll v-bind:data="warmData"></alertScroll>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <!--质差小区占比-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">质差小区占比(时)</span>
          </div>
          <div class="cardBody">
            <lineChart :height="'195px'" :data="zcxqData3"></lineChart>
          </div>
        </el-card>
        <!--投诉落单量-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">投诉落单量(时)</span>
          </div>
          <div class="cardBody">
            <lineChart :height="'198px'" :data="zcxqData2"></lineChart>
          </div>
        </el-card>
        <!--告警情况-->
        <el-card class="box-card">
          <div slot="header">
            <span class="CardTitle">退服告警(时)</span>
          </div>
          <div class="cardBody">
            <lineChart :height="'198px'" :data="zcxqData1"></lineChart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import alertScroll from './components/alertScroll'
import Map from './components/chart/map'
import lineChart from './components/chart/lineChart'
// import { color } from 'echarts'
import param from '../config/indexTable'
export default {
  name: 'Home',
  components: {
    alertScroll,
    Map,
    lineChart
  },
  data () {
    return {
      // 顶部统计
      dataCard: [
        {
          name: '交通干线',
          icon: require('@/assets/icon/jtgx.png'),
          value: [0, 0],
          unit: ['个', '个'],
          ratio: [0, 0],
          status: ['up', 'up']
        },
        {
          name: '交通枢纽',
          icon: require('@/assets/icon/jtsn.png'),
          value: [0, 0],
          unit: ['个', '个'],
          ratio: [0, 0],
          status: ['up', 'up']
        },
        {
          name: '商业中心',
          icon: require('@/assets/icon/syzx.png'),
          value: [0, 0],
          unit: ['个', '个'],
          ratio: [0, 0],
          status: ['up', 'up']
        },
        {
          name: '重点景区',
          icon: require('@/assets/icon/zdjq.png'),
          value: [0, 0],
          unit: ['个', '个'],
          ratio: [0, 0],
          status: ['up', 'up']
        },
        {
          name: '党政军',
          icon: require('@/assets/icon/dzj.png'),
          value: [0, 0],
          unit: ['个', '个'],
          ratio: [0, 0],
          status: ['up', 'up']
        }
      ],
      flage1: 0,
      flage2: 1,
      // 地市业务量
      LocalBusinessVolume1: [
        {
          label: '全疆',
          data: [86, 56, 78, 85],
          color: ['', '', '', '']
        },
        {
          label: '阿克苏',
          data: [78, 88, 97, 94],
          color: ['', '', '', '']
        },
        {
          label: '阿勒泰',
          data: [55, 94, 62, 67],
          color: ['', '', '', '']
        },
        {
          label: '巴州',
          data: [44, 67, 87, 17],
          color: ['', '', '', '']
        },
        {
          label: '博州',
          data: [45, 17, 87, 61],
          color: ['', '', '', '']
        },
        {
          label: '昌吉',
          data: [98, 57, 17, 97],
          color: ['', '', '', '']
        },
        {
          label: '哈密',
          data: [48, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '和田',
          data: [64, 67, 68, 67],
          color: ['', '', '', '']
        },
        {
          label: '喀什',
          data: [64, 67, 77, 67],
          color: ['', '', '', '']
        },
        {
          label: '克拉玛依',
          data: [76, 96, 60, 77],
          color: ['', '', '', '']
        },
        {
          label: '克州',
          data: [94, 77, 87, 87],
          color: ['', '', '', '']
        },
        {
          label: '奎屯',
          data: [63, 67, 67, 76],
          color: ['', '', '', '']
        },
        {
          label: '石河子',
          data: [51, 67, 47, 77],
          color: ['', '', '', '']
        },
        {
          label: '塔城',
          data: [64, 67, 61, 67],
          color: ['', '', '', '']
        },
        {
          label: '吐鲁番',
          data: [88, 87, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '乌鲁木齐',
          data: [96, 97, 77, 67],
          color: ['', '', '', '']
        },
        {
          label: '伊犁',
          data: [64, 67, 75, 67],
          color: ['', '', '', '']
        }
      ],
      LocalBusinessVolume2: [
        {
          label: '全疆',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '阿克苏',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '阿勒泰',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '巴州',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '博州',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '昌吉',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '哈密',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '和田',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '喀什',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '克拉玛依',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '克州',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '奎屯',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '石河子',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '塔城',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '吐鲁番',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '乌鲁木齐',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        },
        {
          label: '伊犁',
          data: [67, 67, 67, 67],
          color: ['', '', '', '']
        }
      ],
      zcxqData1: {
        title: '',
        xData: ['阿克苏', '阿勒泰', '巴州', '博州', ' 昌吉', '哈密', '和田', '喀什', '克拉玛依', '克州', '奎屯', '石河子', '塔城', '吐鲁番', '乌鲁木齐', '伊犁'],
        unit: [{
          name: '单位:(个)',
          position: 'left',
          minInterval: 1
        }],
        barBgWidth: 17,
        data: [
          {
            name: '4G基站退服',
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yIndex: 0,
            color: ['rgb(27,255,116)', 'rgba(0,177,50,0.30196)'],
            type: 'bar',
            barWidth: 12
          },
          {
            name: '5G基站退服',
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yIndex: 0,
            color: ['rgb(255,177,40)', 'rgba(247,109,29,0.30196)'],
            type: 'bar',
            barWidth: 12
          }
        ]
      },
      zcxqData2: {
        title: '',
        xData: ['阿克苏', '阿勒泰', '巴州', '博州', ' 昌吉', '哈密', '和田', '喀什', '克拉玛依', '克州', '奎屯', '石河子', '塔城', '吐鲁番', '乌鲁木齐', '伊犁'],
        unit: [{
          name: '单位:(个)',
          position: 'left',
          minInterval: 1
        }],
        barBgWidth: 17,
        data: [
          {
            name: '4G投诉落单量',
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yIndex: 0,
            color: ['rgb(27,255,116)', 'rgba(0,177,50,0.30196)'],
            type: 'bar',
            barWidth: 12
          },
          {
            name: '5G投诉落单量',
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yIndex: 0,
            color: ['rgb(255,177,40)', 'rgba(247,109,29,0.30196)'],
            type: 'bar',
            barWidth: 12
          }
        ]
      },
      zcxqData3: {
        title: '',
        xData: ['阿克苏', '阿勒泰', '巴州', '博州', ' 昌吉', '哈密', '和田', '喀什', '克拉玛依', '克州', '奎屯', '石河子', '塔城', '吐鲁番', '乌鲁木齐', '伊犁'],
        unit: [{
          name: '单位:(%)',
          position: 'left'
        }],
        barBgWidth: 17,
        data: [
          {
            name: '4G差质小区',
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yIndex: 0,
            color: ['rgb(27,255,116)', 'rgba(0,177,50,0.30196)'],
            type: 'bar',
            barWidth: 12
          },
          {
            name: '5G差质小区',
            value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yIndex: 0,
            color: ['rgb(255,177,40)', 'rgba(247,109,29,0.30196)'],
            type: 'bar',
            barWidth: 12
          }
        ]
      },
      chartData: {
        legendList: ['5G问题小区占比', '4G问题小区占比'],
        stage: [
          {
            min: 0,
            max: 10,
            label: '0-10',
            color: ''
          },
          {
            min: 10,
            max: 50,
            label: '10-50',
            color: ''
          },
          {
            min: 50,
            max: 70,
            label: '50-70',
            color: ''
          },
          {
            min: 70,
            max: 90,
            label: '70-90',
            color: ''
          },
          {
            min: 9999,
            max: 10000,
            label: '大于1',
            color: ''
          }
        ],
        data: [
          {
            name: '和田',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '巴州',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '喀什',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '克州',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '阿克苏',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '吐鲁番',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '乌鲁木齐',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '哈密',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '伊犁',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '昌吉',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '克拉玛依',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '博州',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '塔城',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '阿勒泰',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '奎屯',
            value: [0, 0],
            totalP: 0
          },
          {
            name: '石河子',
            value: [0, 0],
            totalP: 0
          }
        ]
      },
      warmData: [{
        title: '4G高负荷预警小区TOP10',
        data: [
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          }
        ]
      }, {
        title: '5G高负荷预警小区TOP10',
        data: [
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          },
          {
            name: '某某某某小区',
            rate: 80,
            value: 5670,
            unit: 'GB'
          }
        ]
      }
      ],
      KPI: [
        {
          KPITYPE: '4G接通率',
          STANDARD: 98,
          CHALLENGE: 99
        },
        {
          KPITYPE: '4G掉线率',
          STANDARD: 98,
          CHALLENGE: 99
        },
        {
          KPITYPE: 'VOLLTE接通率',
          STANDARD: 98,
          CHALLENGE: 99
        },
        {
          KPITYPE: 'VOLLTE掉线率',
          STANDARD: 98,
          CHALLENGE: 99
        },
        {
          KPITYPE: '5G接通率',
          STANDARD: 98,
          CHALLENGE: 99
        },
        {
          KPITYPE: '5G接通率',
          STANDARD: 98,
          CHALLENGE: 99
        },
        {
          KPITYPE: '4G故障基站数',
          STANDARD: 98,
          CHALLENGE: 99
        },
        {
          KPITYPE: '5G故障基站数',
          STANDARD: 98,
          CHALLENGE: 99
        }
      ],
      index: 0,
      index2: 1
      // chartData2: {}
    }
  },
  methods: {
    getTop () {
      // 1
      this.$jsonp(param.url, param.page2Top).then((res) => {
        res.rows.forEach((item, index) => {
          switch (item.SCENETYPE) {
            case 'GX':
              this.setTop(item, 0)
              break
            case 'SN':
              this.setTop(item, 1)
              break
            case 'ZX':
              this.setTop(item, 2)
              break
            case 'JQ':
              this.setTop(item, 3)
              break
            case 'DZJ':
              this.setTop(item, 4)
          }
        })
        this.$forceUpdate()
      })
    },
    getData () {
      this.$jsonp(param.url, param.page2Data).then((res) => {
        res.rows.forEach((item, index) => {
          item.LTELOST = Number(item.LTELOST)
          item.LTELINK = Number(item.LTELINK)
          item.VOLTELINK = Number(item.VOLTELINK)
          item.VOLTELOST = Number(item.VOLTELOST)
          item.FIVELINK = Number(item.FIVELINK)
          item.FIVELOST = Number(item.FIVELOST)
          if (item.CITY === '全疆') {
            this.setData(item, 0)
          } else {
            if (item.FOURW > this.zcxqData1.unit[0].max) {
              this.zcxqData1.unit[0].max = Number(item.FOURW) + 4
            }
            if (item.FIVEW > this.zcxqData1.unit[0].max) {
              this.zcxqData1.unit[0].max = Number(item.FIVEW) + 4
            }
            // 其他地市
            switch (item.CITY) {
              case '阿克苏':
                this.setData(item, 1)
                this.setMapData(item, 4)
                break
              case '阿勒泰':
                this.setData(item, 2)
                this.setMapData(item, 13)
                break
              case '巴州':
                this.setData(item, 3)
                this.setMapData(item, 1)
                break
              case '博州':
                this.setData(item, 4)
                this.setMapData(item, 11)
                break
              case '昌吉':
                this.setData(item, 5)
                this.setMapData(item, 9)
                break
              case '哈密':
                this.setData(item, 6)
                this.setMapData(item, 7)
                break
              case '和田':
                this.setData(item, 7)
                this.setMapData(item, 0)
                break
              case '喀什':
                this.setData(item, 8)
                this.setMapData(item, 2)
                break
              case '克拉玛依':
                this.setData(item, 9)
                this.setMapData(item, 10)
                break
              case '克州':
                this.setData(item, 10)
                this.setMapData(item, 3)
                break
              case '奎屯':
                this.setData(item, 11)
                this.setMapData(item, 14)
                break
              case '石河子':
                this.setData(item, 12)
                this.setMapData(item, 15)
                break
              case '塔城':
                this.setData(item, 13)
                this.setMapData(item, 12)
                break
              case '吐鲁番':
                this.setData(item, 14)
                this.setMapData(item, 5)
                break
              case '乌鲁木齐':
                this.setData(item, 15)
                this.setMapData(item, 6)
                break
              case '伊犁':
                this.setData(item, 16)
                this.setMapData(item, 8)
                break
            }
          }
        })
      })
      this.$jsonp(param.url, param.page2Warm).then((res) => {
        res.rows.forEach((item, index) => {
          if (item.TYPE === '4GTOP') {
            this.warmData[0].data[item.RANK - 1].name = item.NAME
            this.warmData[0].data[item.RANK - 1].rate = item.WIFE
            this.warmData[0].data[item.RANK - 1].value = item.FLOW
          } else if (item.TYPE === '5GTOP') {
            this.warmData[1].data[item.RANK - 1].name = item.NAME
            this.warmData[1].data[item.RANK - 1].rate = item.WIFE
            this.warmData[1].data[item.RANK - 1].value = item.FLOW
          } else {
          }
        })
      })
    },
    getTarget () {
      this.$jsonp(param.url, param.page2Targert).then((res) => {
        res.rows.forEach((item, index) => {
          this.KPI[index].KPITYPE = item.KPITYPE
          this.KPI[index].STANDARD = item.STANDARD
          this.KPI[index].CHALLENGE = item.CHALLENGE
          // 数据库顺序： 4G接通率-4G掉线率-VoLTE接通率-VoLTE掉线率-5G接通率-5G掉线率-4G故障基站数-5G故障基站数
        })
        this.getStage()
        this.getData()
        this.getTop()
      })
    },
    getStage () {
      this.$jsonp(param.url, param.page2Stage).then((res) => {
        res.rows.forEach((item, index) => {
          this.chartData.stage[index].min = Number(item.MIN)
          this.chartData.stage[index].max = Number(item.MAX)
          this.chartData.stage[index].color = item.COLOR
          this.chartData.stage[index].label = item.MIN + '-' + item.MAX
          if (item.STAGE === 'stage5') {
            if (item.MAX === '') {
              this.chartData.stage[4].max = 9999
              this.chartData.stage[4].label = '大于' + item.MIN
            } else {
              this.chartData.stage[4].max = Number(item.MAX)
              this.chartData.stage[4].label = item.MIN + '-' + item.MAX
            }
          }
        })
      })
    },
    setData (item, index) {
      // 4G接通率
      this.LocalBusinessVolume1[index].data[0] = item.LTELINK
      if (item.LTELINK < this.KPI[0].STANDARD) {
        this.LocalBusinessVolume1[index].color[0] = 'red'
      } else if (item.LTELINK > this.KPI[0].CHALLENGE) {
        this.LocalBusinessVolume1[index].color[0] = 'green'
      } else {
        this.LocalBusinessVolume1[index].color[0] = 'white'
      }
      // 4G掉线率
      this.LocalBusinessVolume1[index].data[1] = item.LTELOST
      this.KPI[1].STANDARD = Number(this.KPI[1].STANDARD)
      if (item.LTELOST > this.KPI[1].STANDARD) {
        this.LocalBusinessVolume1[index].color[1] = 'red'
      } else if (item.LTELOST < this.KPI[1].CHALLENGE) {
        this.LocalBusinessVolume1[index].color[1] = 'green'
      } else {
        this.LocalBusinessVolume1[index].color[1] = 'white'
      }
      // 5G接通率
      this.LocalBusinessVolume1[index].data[2] = item.FIVELINK
      if (item.FIVELINK < this.KPI[4].STANDARD) {
        this.LocalBusinessVolume1[index].color[2] = 'red'
      } else if (item.FIVELINK > this.KPI[4].CHALLENGE) {
        this.LocalBusinessVolume1[index].color[2] = 'green'
      } else {
        this.LocalBusinessVolume1[index].color[2] = 'white'
      }
      // 5G掉线率
      this.LocalBusinessVolume1[index].data[3] = item.FIVELOST
      if (item.FIVELOST > this.KPI[5].STANDARD) {
        this.LocalBusinessVolume1[index].color[3] = 'red'
      } else if (item.FIVELOST < this.KPI[5].CHALLENGE) {
        this.LocalBusinessVolume1[index].color[3] = 'green'
      } else {
        this.LocalBusinessVolume1[index].color[3] = 'white'
      }
      // volte接通率
      this.LocalBusinessVolume2[index].data[0] = item.VOLTELINK
      if (item.VOLTELINK < this.KPI[2].STANDARD) {
        this.LocalBusinessVolume2[index].color[0] = 'red'
      } else if (item.VOLTELINK > this.KPI[2].CHALLENGE) {
        this.LocalBusinessVolume2[index].color[0] = 'green'
      } else {
        this.LocalBusinessVolume2[index].color[0] = 'white'
      }
      // volte掉线率
      this.LocalBusinessVolume2[index].data[1] = item.VOLTELOST
      if (item.VOLTELOST > this.KPI[3].STANDARD) {
        this.LocalBusinessVolume2[index].color[1] = 'red'
      } else if (item.VOLTELOST < this.KPI[3].CHALLENGE) {
        this.LocalBusinessVolume2[index].color[1] = 'green'
      } else {
        this.LocalBusinessVolume2[index].color[1] = 'white'
      }
      // 4G故障基站
      this.LocalBusinessVolume2[index].data[2] = item.FOURFAULT
      // 5G故障基站
      this.LocalBusinessVolume2[index].data[3] = item.FIVEFAULT

      this.zcxqData1.data[0].value[index - 1] = item.FOURW
      this.zcxqData1.data[1].value[index - 1] = item.FIVEW
      this.zcxqData2.data[0].value[index - 1] = item.FOURT
      this.zcxqData2.data[1].value[index - 1] = item.FIVET
      this.zcxqData3.data[0].value[index - 1] = item.FOURP
      this.zcxqData3.data[1].value[index - 1] = item.FIVEP
    },
    setMapData (item, index) {
      this.chartData.data[index].value[0] = item.FOURTOTAL
      this.chartData.data[index].value[1] = item.FIVETOTAL
      this.chartData.data[index].totalP = item.TOTALP
    },
    setTop (item, index) {
      this.dataCard[index].value[0] = item.FOURTOTAL
      this.dataCard[index].value[1] = item.FIVETOTAL
      if (item.FOURCHANGE < 0) {
        this.dataCard[index].status[0] = 'down'
        item.FOURCHANGE = item.FOURCHANGE.toString().substr(1)
      }
      this.dataCard[index].ratio[0] = item.FOURCHANGE
      if (item.FIVECHANGE < 0) {
        this.dataCard[index].status[1] = 'down'
        item.FIVECHANGE = item.FIVECHANGE.toString().substr(1)
      }
      this.dataCard[index].ratio[1] = item.FIVECHANGE
    },
    times () {
      return setInterval(() => {
        this.flage1++
        this.flage2++
      }, 10000)
    },
    times2 () {
      return setInterval(() => {
        this.getTarget()
      }, 3600000)
    }
  },
  mounted () {
    this.getTarget()
    this.times()
    this.times2()
  },
  destroyed () {
    clearInterval(this.times)
  }
}
</script>
<style lang="scss" scoped>

</style>
