<template>
  <div class="datepicker">

    <div class="date-list">
      <!-- 星期 -->
      <ul class="weekdays">
        <li v-for="(item,index) in weeks" :key="index">
          {{item}}
        </li>

      </ul>
      <!-- 日期 -->
      <ul class="days">
          <li v-for="(day, index) in days"
                  v-if="day.getMonth()+1 === currentMonth"
                  :key="index"
                  :class="{'is-active':day.getTime()===new Date(selectedTime).getTime(),'other-month':day.getMonth()+1 !== currentMonth}"
                  @click="pick(day,days)"
          >
            {{day.getDate()}}</li>
      </ul>
      <!--            <span class="pre-btn" @click="weekPre"> <van-icon name="arrow-left" size="16" /> </span>-->
      <!--            <span class="nex-btn" @click="weekNext"> <van-icon name="arrow" size="16" /> </span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "datePicker",
    props: {

      time:{
        default: ''
      },
      format: {
        type: String,    // 可选项：YYYY-MM-DD（默认）, YYYY/MM/DD, YYYY年MM月DD日, YYYYMMDD
        default: 'YYYY-MM-DD'
      }
    },
    data() {
      return {
        canCheckDate:new Date().setDate(new Date().getDate()),
        mapTime:{
          0:'日',
          1:'一',
          2:'二',
          3:'三',
          4:'四',
          5:'五',
          6:'六',

        },
        showToday:new Date(this.formatDate(new Date()))+'',//当前日期红点显示
        currentYear: 1970,    // 年份
        currentMonth: 1,      // 月份
        currentDay: 1,        // 日期
        currentWeek: 1,       // 星期
        selectedDay: 1,
        selectedTime: '',
        days: [],
        weeks: [],
        pickerTime: new Date(),
        isVisiblePicker: false,
      };
    },
    mounted() {
      this.action(this.selectedTime)
    },

    methods: {
      action(time){
        time=time||new Date(new Date().setDate(new Date().getDate()))
        this.selectedTime = this.formatDate(time,'add')
        this.initData(this.canCheckDate);
        this.pick(this.selectedTime)
      },


      // 选择日期
      pick(date) {
        // if(new Date(date)>((new Date()/1000+86400)*1000)){
        let d = new Date(date);
        this.selectedTime = this.formatDate(d)
        this.$emit(
                "change",
                this.formatDate(this.selectedTime,'set')
        );

      },

      checkJuge(time,type){
        let date = new Date(time)
        let y = date.getFullYear();
        let m = date.getMonth()+1;
        let d=type?date.getDate()-1:date.getDate();
        if (m < 10) m = `0${m}`;
        if (d < 10) d = `0${d}`;
        // if (type==='set') {            // 设置日期格式为format格式
        //   res=this.setFormat(y, m, d)
        // } else {
        return `${y}/${m}/${d}`;        // YYYY/MM/DD
        // }


      },

      // 初始化日期
      initData(cur,type) {
        if(type==='init' && this.checkJuge(this.selectedTime)>this.checkJuge(this.canCheckDate)){
          return
        }
        let date = "";
        cur ? date = new Date(cur) : date = new Date();

        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();          // 当前年份
        this.currentMonth = date.getMonth() + 1;        // 当前月份

        this.currentWeek = date.getDay();               // 1...6,0  // 星期几

        this.days.length = 0;
        this.weeks = [];
        let str = this.formatDate(date);

        // 获取本周日期，周日排第一个
        // for (let i = this.currentWeek; i >= 0; i -= 1) {
        //     const d = new Date(str);        // 当日之前的日期
        //     d.setDate(d.getDate() - i);
        //     this.days.push(d);
        // }
        if(!type){
          for (let i =0; i <7; i += 1) {
            const d = new Date(str);        // 当日之后的日期
            d.setDate(d.getDate() + i);
            this.weeks.push(this.mapTime[d.getDay()])
            this.days.push(d);
          }
        }else {
          for (let i = this.currentDay; i < this.currentDay+7; i += 1) {
            const d = new Date(str);        // 当日之后的日期
            d.setDate(d.getDate() + i);
            this.weeks.push(this.mapTime[d.getDay()])
            this.days.push(d);
          }
        }
      },

      // 格式化
      formatDate(t, type) {
        let time = this.initFormat(t)
        let date = new Date(time)
        let y = date.getFullYear();
        let m = date.getMonth()+1;
        let d= date.getDate();
        if (m < 10) m = `0${m}`;
        if (d < 10) d = `0${d}`;
        let res=''
        if (type==='set') {            // 设置日期格式为format格式
          res=this.setFormat(y, m, d)
        } else {
          res= `${y}/${m}/${d}`;        // YYYY/MM/DD
        }

        return res
      },

      // 初始化日期格式
      initFormat(time){
        const r4 = /^(\d{4})(\d{2})(\d{2})$/i;                // YYYYMMDD
        if (!time) return new Date();
        if (typeof time === 'object') {
          return time
        }
        // 非YYYY/MM/DD格式的日期，都转换成YYYY/MM/DD
        if (r4.test(time)){
          return `${time.substr(0,4)}/${time.substr(4,2)}/${time.substr(6,2)}`
        }
        else {
          return `${time.substr(0,4)}/${time.substr(5,2)}/${time.substr(8,2)}`
        }
      },

      // 设置日期格式
      setFormat(y, m, d){
        const r1 = /^(Y{4})-(M{2})-(D{2})$/i;              // YYYY-MM-DD（默认）
        const r2 = /^(Y{4})\/(M{2})\/(D{2})$/i;            // YYYY/MM/DD
        const r3 = /^(Y{4})[\u4e00-\u9fa5](M{2})[\u4e00-\u9fa5](D{2})[\u4e00-\u9fa5]$/i;    // YYYY年MM月DD日
        const r4 = /^(Y{4})(M{2})(D{2})$/i;                // YYYYMMDD
        if (!this.format || r1.test(this.format)) {
          return `${y}-${m}-${d}`;
        }
        else if (r2.test(this.format)) {
          return `${y}/${m}/${d}`;
        }
        else if (r3.test(this.format)) {
          return  `${y}年${m}月${d}日`;
        }
        else if (r4.test(this.format)) {
          return `${y}${m}${d}`;
        }
        else {
          alert('日期格式不支持！')
          return
        }
      }
    }
  };
</script>

<style scoped>
  .datepicker {
    width: 100%;
    height: auto;
    color: #606266;
    text-align: center;
    font-size: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .date-list {
    width: 100%;
    position: relative;
  }
  .weekdays {
    display: flex;
    justify-content: space-around;
  }
  .weekdays li {
    text-align: center;
    margin: 0.3rem;
    color: #909399;
  }
  .days {
    display: flex;
    justify-content: space-around;
  }
  .days li {
    text-align: center;
    padding: 0.4rem;
    width:1.2rem;
  }
  .days li.is-active {
    background: #FEE6E7;
    border-radius: 50%;
    color: #E60012;
  }
  .days li .point{
    width: 3px;
    height: 3px;
    border-radius: 3px;
    background: #E60012;
  }
  .other-month {
    color: #e4393c;
  }


</style>
