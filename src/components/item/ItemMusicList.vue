<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span
          >播放全部<span> (共{{ itemList.length }}首)</span></span
        >
      </div>
      <div class="listRigth">
        
        <span>收藏量({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemList" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div class="leftDiv">
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">
              {{ item1.name }}</span
            >
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="item.mv">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {
    // console.log(props);
  },
  props: ["itemList", "subscribedCount"],
  methods: {
    playMusic: function (i) {
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(i);
    },
    ...mapMutations([`updatePlayList`, `updatePlayListIndex`]),
  },
};
</script>
<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 3rem;
      height: 100%;
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
        font-weight: bold;
        span {
          font-size: 10px;
          margin-left: 0;
          color: rgb(199, 178, 178);
        }
      }
    }
    .listRigth {
      background-color: brown;
      border-radius: 50px;
      height: 80%;
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(227, 201, 201);
      .icon {
        // margin-right: 5px;
        fill: #fff;
      }
      span {
        margin-right: 5px;
      }
    }
  }

  .itemList {
    background-color: #fff;
    .item {
      margin-top: 10px;
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 200px;

        .leftSpan {
          display: inline-block;
          height: 50px;

          line-height: 35px;
          position: absolute;
        }
        .leftDiv {
          margin-left: 30px;
          width: 60%;
          right: 50px;
          p {
            font-weight: bold;
            font-size: 12px;
          }
          span {
            color: rgb(159, 139, 139);
            font-size: 12px;
          }
        }
      }
      .itemRight {
        height: 100%;

        float: right;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        .icon {
          margin: 10px;
          fill: rgb(169, 190, 190);
          float: left;
        }
      }
    }
  }
}
</style>