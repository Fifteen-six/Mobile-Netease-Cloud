<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>{{ playList[playListIndex].al.name }}</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg> -->
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <MusicDetailVue
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"
    /></van-popup>
  </div>
</template>
<script>
import MusicDetailVue from "./MusicDetail.vue";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState([`playList`, `playListIndex`, `isbtnShow`, `detailShow`]),
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    play: function () {
      //  判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); //播放就调用函数进行传值
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //暂停清除定时器
      }
    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration); //歌曲 总时间
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime); //歌曲 当前时间
      }, 1);
    },
    ...mapMutations([
      "updateIsbtnShow",
      "updateCurrentTime",
      "updateDetailShow",
      "updateDuration",
    ]),
  },
  watch: {
    playListIndex: function () {
      //如果下标发生改变，就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //如果暂停状态，改变图标
        this.updateIsbtnShow(false);
      }
    },
    playList: function () {
      if (this.isbtnShow) {
        //是否暂停状态
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
  },
  components: {
    MusicDetailVue,
  },
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  border-top: 1px solid #999;
  bottom: 0;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
    }
  }
}
</style>