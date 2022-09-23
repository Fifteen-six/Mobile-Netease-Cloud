import { getemailLogin } from '@/request/api/home'
import { createStore } from 'vuex'
import { getMusiclyric } from '../request/api/item'

export default createStore({
  state: {
    playList: [{
      al: {
        id: 74122275,
        name: "Holding On",
        pic: 109951163628586990,
        picUrl: "https://p1.music.126.net/_RHF0WUKJswrPHJc9hf5-Q==/109951163628586985.jpg",
        pic_str: "109951163628586985"
      },
      id: 1320909023,
      name: 'Cannons'
    }],
    playListIndex: 0,//默认下标为0
    isbtnShow: true,//暂停按钮的显示
    detailShow: false,//歌曲详情页的显示
    lyricList: {},//歌词
    currentTime: 0,//歌曲播放时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooterMusic: true,//判断底部组件是否需要显示
    token: '',
    user: {}//用户信息
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value//暂停按钮的显示
    },
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },
    updatePlayList: function (state, value) {
      state.playList = value

    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value

    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList: function (state, value) {
      state.lyricList = value//每首 歌词
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value
    },
    updateDuration: function (state, value) {
      state.duration = value
    },
    updateIsLogin: function (state, value) {
      state.isLogin = true
    },
    updateToken: function (state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    updateUser: function (state, value) {
      state.user = value
    }

  },
  actions: {
    getLyric: async function (context, value) {

      let res = await getMusiclyric(value)
      // console.log(res.data.lrc)歌词
      context.commit("updateLyricList", res.data.lrc)
    },
    getLogin: async function (context, value) {
      console.log(value);
      let res = await getemailLogin(value)
      console.log(res)
      // console.log(res);
      return res
    }
  },
  modules: {
  }
})
