<template>
  <div class="topNav">
    <div class="headerLeft">
      
      <iframe style="margin-top: 10px;" width="400" scrolling="no" height="30" frameborder="0" allowtransparency="true" src="https://i.tianqi.com?c=code&id=34&color=%2349d9fe&icon=1&site=16"></iframe>
    </div>
    <i class="logo"></i>
    <b class="title">2022年春节无线业务保障作战图</b>
    <b class="headerRight f-20">
      {{ nowDate }}
    </b>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowDate: ''
    }
  },
  created () {
    this.currentTime()
  },
  beforeDestroy () {
    if (this.formatDate) {
      clearInterval(this.formatDate)
    }
  },
  methods: {
    currentTime () {
      setInterval(this.formatDate, 500)
    },
    formatDate () {
      const date = new Date()
      const year = date.getFullYear() // 年
      const month = date.getMonth() + 1 // 月
      const day = date.getDate() // 日
      let hour = date.getHours() // 时
      hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
      let minute = date.getMinutes() // 分
      minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
      let second = date.getSeconds() // 秒
      second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
      this.nowDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
  }
}
</script>
<style lang="scss" scoped>
  .headerRight{
    position: absolute;
    right: 20px;
    font-size: 20px;
    top:8px;
    color: #fff;
    background-image:-webkit-linear-gradient(top,#49d9fe,#1765ff);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .headerLeft{
    position: absolute;
    left: 20px;
    margin-left: 40px;
  }
  .wlmq{
    position: absolute;
    background-color: #010E3B;
margin-left: -1800px;
margin-top: 10px;
z-index: 1;
  }
</style>
