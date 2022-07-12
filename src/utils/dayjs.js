import Vue from 'vue';
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
// console.log(dayjs().format("YYYY-MM-DD"));
// console.log(dayjs().to(dayjs('2020-02-01')));
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
