/**
 * Created by deerYeah on 2017/5/23.
 */
import vue from 'vue';
import axios from 'axios';
import detail from '../vue/detail.vue';
vue.prototype.$http = axios;

require('../css/common.scss');
require('../css/detail.scss');

new vue({
    el: '#app',
    render: h=> h(detail)
});