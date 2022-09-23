<template>
  <div>
    <img :src="musicList.al.picUrl" alt="" class="bgimg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon liebiao" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="leftMarquee">
          <Vue3Marquee style="color: #ffff">
            {{ musicList.al.name }}
          </Vue3Marquee>
          <span v-for="item in musicList.ar" :key="item"> {{ item.name }}</span>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-xiangyoujiantou"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow">
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="img_needle"
        :class="{ img_needle_active: !isbtnShow }"
      />

      <img src="@/assets/disc-plus.png" alt="" class="img_disc" />
      <img
        @click="isLyricShow = true"
        :src="musicList.al.picUrl"
        alt=""
        class="img-ar"
        :class="{ img_ar_pauesd: isbtnShow }"
      />
    </div>
    <div
      class="musiclyric"
      @click="isLyricShow = false"
      ref="musicLyric"
      v-show="isLyricShow"
    >
      <p
        v-for="(item, i) in lyric"
        :key="i"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>

        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <svg class="icon" aria-footerhidden="true">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
      <div class="footerContent">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.015"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-repeat2"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script >
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState([
      "duration", //歌曲总时长
      "lyricList", //歌词
      "currentTime", //歌曲当前时间
      "playListIndex", //下标
      "playList",
    ]),

    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        // console.log(this.lyricList.lyric);
        // console.log(this.lyricList.lyric.split(/[(\r\n)\r\n]+/));
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min, sec, Number(mill), lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 0;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }

      return arr;
    },
  },
  mounted() {
    this.addDuration();
  },
  props: ["musicList", "isbtnShow", "play", "addDuration"],
  methods: {
    backHome: function () {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index > this.playList.length - 1) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations([`updateDetailShow`, `updatePlayListIndex`]),
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      
      if (p) {
        if (p && p.offsetTop >= 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop-270;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
  components: {
    Vue3Marquee,
  },
};
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 20px;
      span {
        color: rgb(124, 117, 117);
      }
      .icon {
        width: 0.3rem;
        height: 15px;
        fill: rgb(135, 130, 130);
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_disc {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img-ar {
    width: 3.3rem;
    height: 3.3rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  // .img_ar_active {
  //   animation-play-state: running;
  // }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musiclyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow: scroll;
  p {
    color: #999;
    margin-bottom: 20px;
  }
  .active {
    color: #fff;
    font-size: 25px;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(175, 142, 142);
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: rgb(82, 74, 74);
    }
  }
}
</style>