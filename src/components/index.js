import timePickers from "./timePickers.vue";

const vant_date_pickers = {
  install(Vue,options){
    Vue.component(timePickers.name, timePickers)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.vant_date_pickers = vant_date_pickers;
  Vue.use(vant_date_pickers);
}

export default vant_date_pickers;
