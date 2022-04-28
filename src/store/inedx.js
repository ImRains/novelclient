/**
 * @description vuex 入口文件
 */

import { createStore } from 'vuex'
import user from './modules/user'

export default createStore({
    modules:{
        user
    }
})
