/**
 * @description vuex user 模型
 */

const state = (() => {
    return {
        userInfo: JSON.parse(sessionStorage.getItem("USER_INFO")) ||{}
    }
})

const mutations = {
    setUserInfo(state,info){
        state.userInfo = info
        sessionStorage.setItem("USER_INFO", JSON.stringify(info))
    }
}

const getters = {
    getUserInfo(state){
        return state.userInfo
    }
}

const actions = {
    setUserInfo(context,info){
        context.commit('setUserInfo',info)
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}