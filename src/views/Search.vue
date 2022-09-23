<template>
  <div>
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        placeholder="许嵩"
        v-model="searchKey"
        @keydown.enter="enterKey"
      />
    </div>
    <div class="searchHistory">
      <span class="searchSpan">历史</span>
      <span
        v-for="item in keyWorldList"
        :key="item"
        class="spanKey"
        @click="searchHistory(item)"
      >
        {{ item }}</span
      ><svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>

    <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div class="leftDiv">
            <p>{{ item.name }}</p>
            <span v-for="(item, index) in item.artists" :key="index">
              {{ item.name }}</span
            >
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="item.mvid">
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
import { getSearchMusic } from "@/request/api/home.js";
export default {
  data() {
    return {
      keyWorldList: [], //输入历史记录
      searchKey: "", //输入框
      searchList: [], //歌曲
      // empty: 0,
    };
  },
  mouted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
  },
  // watch: {
  //   keyWorldList:function(){this.keyWorldList=JSON.parse(localStorage.getItem("keyWorldList"))
  //     ? JSON.parse(localStorage.getItem("keyWorldList"))
  //     : []}
  // },
  methods: {
    enterKey: async function () {
      if (this.searchKey != "") {
        this.keyWorldList.unshift(this.searchKey);

        //去重
        this.keyWorldList = [...new Set(this.keyWorldList)];
        //固定长度
        if (this.keyWorldList.length > 5) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        let res = await getSearchMusic(this.searchKey);
        // console.log(res);

        this.searchList = res.data.result.songs;

        this.searchKey = "";
      }
    },
    delHistory: function () {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
    },
    searchHistory: async function (item) {
      // console.log(item);名字
      let res = await getSearchMusic(item);
      // console.log(res);带x名字的歌曲
      this.searchList = res.data.result.songs;
    },
    updateIndex: function (item) {
      console.log(item);
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    },
  },
};
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 10px;
  display: flex;
  align-items: center;
  input {
    margin-left: 20px;
    border: none;
    border-bottom: 1px solid;
    width: 90%;
    padding: 5px;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 5px 10px;
    background-color: rgb(208, 192, 192);
    border-radius: 20px;
    margin: 5px;
    display: inline-block;
  }
  .icon {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 10px;
  }
}
.itemList {
  .itemLeft {
    margin-top: 15px;
    display: inline;
    float: left;
    height: 50px;
    width: 60%;

    .leftSpan {
      display: block;
      line-height: 40px;
      text-align: center;
      width: 10%;
      height: 40px;
      position: absolute;
    }
    .leftDiv {
      margin-left: 50px;
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
    display: inline;
    float: right;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .icon {
      margin: 10px;
      fill: rgb(131, 154, 154);
      float: left;
    }
  }
}
.empty {
  font-size: 30px;
  text-align: center;
}
</style>