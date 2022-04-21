<template>
    <div>    <van-popup v-model="showCheckDate"  position="bottom" :style="{ height: '260px' }">
        <div class="date-popup">
            <div class="top bborder">
                <span class="col6D6D6D" @click="showCheckDate = false">取消</span>
                <span class="fw400">请选择时间</span>
                <span class="fw" @click="sureTime">确定</span>
            </div>
            <div> <date-picker :time="timeShow.time" :format="format"  @change="changeDate"></date-picker>
            </div>
            <div>
<!--                <p class="fs16">时间段</p>-->
                <div class=" flex-wrap-evenly problem">
                    <div v-for="(item,index) in datePointCheck" :key="index"
                         style="width: 25%;"
                         class="color-dark-a pad-8-10 mgt10 fs13 bor-radius-8 "
                         :class="[item.isActive?'check':'bor-grey color-grey',index!==0 &&index!==3?'mg12':''] "
                         @click="checkDatePoint(item.title,index)"
                    >{{item.title}}
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
    </div>
</template>

<script>
    import {Popup,Toast} from 'vant'
    import datePicker from './date-picker.vue'
    import 'vant/es/popup/style';
    export default {
        name: "timePickers",
      props:{
        showCheckDate:{
          type: Boolean,
          default:false
        }
      },
        components: {
            [Popup.name]:Popup,
            [Toast.name]:Toast,
            datePicker
        },
        data(){
            return{
                // showCheckDate:true,
                timeShow: {
                    time: '',
                    timePoint: '',
                    format: ''
                },
                datePointCheck: [
                    {
                        title: '08:00-10:00',
                        isActive: false
                    },
                    {
                        title: '10:00-12:00',
                        isActive: false
                    },
                    {
                        title: '12:00-14:00',
                        isActive: false
                    },
                    {
                        title: '14:00-16:00',
                        isActive: false
                    },
                    {
                        title: '16:00-18:00',
                        isActive: false
                    },
                    {
                        title: '18:00-20:00',
                        isActive: false
                    }
                ],
                format: 'yyyy-mm-dd',

            }
        },
        methods:{
            changeDate(val){
                this.timeShow.time = val
            },
            //确认选择该时间
            sureTime(){
                console.log(this.timeShow.time)
                this.timeShow.time && this.timeShow.timePoint ?this.timeShow.format=this.timeShow.time+' '+this.timeShow.timePoint : this.$toast('请选择时间段！')
                this.timeShow.format?this.showCheckDate=false:''
            },
            //时间段选择样式切换
            checkDatePoint(val,index){
                this.datePointCheck.filter(e=>e.isActive=false)
                this.datePointCheck[index].isActive=true
                this.timeShow.timePoint=val
            },
        }

    }
</script>

<style scoped>
    @import '../assets/common.css';
</style>
