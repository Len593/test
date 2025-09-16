/*
 * @Author: fujihang
 * @Date: 2025-02-16 16:09:21
 * @LastEditTime: 2025-06-14 21:14:37
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        newList: [], //消息列表
        fontfamily: uni.getStorageSync('fontfamily') || "jt",
        newsVal: 0,
    },
    mutations: {
        upNewPushFN(state, data) {
            state.newList.push(data)
        },
        fontfamilyFN(state, data) {
            state.fontfamily = data
        },
        setNewsValFN(state, data) {
            state.newsVal = data
        },
        delNewFN(state, data) {
            state.newList = state.newList.filter(s => {
                if (data.senderUserIds[s.senderUserId] && data.sentTimes[s.sentTime]) {
                } else return s
            })
        },
    }
})

export default store