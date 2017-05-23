/**
 * Created by deerYeah on 2017/5/23.
 */

import vue from 'vue';
import axios from 'axios';
import index from '../vue/index.vue';

vue.prototype.$http = axios;

require('../css/common.scss');
require('../css/index.scss');

new vue({
    el: '#app',
    render: h => h(index)
})