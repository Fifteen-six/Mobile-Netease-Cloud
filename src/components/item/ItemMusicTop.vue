<template>
  <div class="Music">
    <div class="itemMusicTop">
      <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
    <div class="itemTopContent">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" alt="" />
        <div class="playCount">
          <svg class="icon" aria-hidden="true" font-szie:10px>
            <use xlink:href="#icon-24gl-play"></use>
          </svg>
          <span>{{ changeCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="contentRight">
        <p class="rightP-one">{{ playlist.name }}</p>
        <div class="right_img">
          <img :src="playlist.creator.backgroundUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangyoujiantou"></use>
          </svg>
        </div>
        <div class="rightP_two">
          <span>{{ playlist.description }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangyoujiantou"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="itemTopFooter">
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true" hegiht:20px>
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    //通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
    //对播放量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount };
  },
  props: ["playlist"],
};
</script>
<style lang="less" scoped>
.Music {
  .itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 0.2rem;
    position: relative;
    .itemLeft,
    .itemRight {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0.2rem;
      span {
        font-size: 0.4rem;
        color: #fff;
      }
      .icon {
        fill: #fff;
      }
    }
    .bgimg {
      width: 100%;
      height: 11rem;
      position: fixed;
      z-index: -1;
      filter: blur(30px);
    }
  }
  .itemTopContent {
    width: 100%;
    height: 150px;
    .contentLeft {
      position: relative;
      width: 160px;
      float: left;

      .playCount {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        color: rgb(142, 111, 111);
        margin: 10px;
      }
      img {
        width: 150px;
        margin-left: 10px;
        border-radius: 10px;
      }
    }
    .contentRight {
      width: 200px;
      height: 100%;
      float: right;
      color: rgb(212, 188, 188);
      .right_img {
        display: flex;
        margin-top: 21px;
        color: rgb(192, 168, 168);
        .icon {
          fill: rgb(192, 168, 168);
        }
        img {
          width: 30px;
          border-radius: 100%;
        }
        span {
          margin-left: 5px;
        }
      }
      .rightP-one {
        word-break: normal;
        width: auto;
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
      }
      .rightP_two {
        height: 30px;
        width: 100%;
        margin-top: 22px;

        span {
          float: left;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 100%;
          width: 170px;
          font-size: 9px;
          color: rgb(211, 189, 189);
        }
        .icon {
          fill: rgb(192, 168, 168);

          float: right;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
  .itemTopFooter {
    margin-top: 15px;
    display: flex;
    width: 100%;
    height: 55px;
    .footerItem {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .icon {
      margin-bottom: 5px;
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>

