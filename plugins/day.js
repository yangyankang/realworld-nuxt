import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (val, formate = 'YYYY-MM-DD') => {
  return dayjs(val).format(formate)
})