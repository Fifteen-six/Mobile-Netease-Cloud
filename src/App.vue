<template>
  <router-view />
  <FootrtMusicVue v-show="$store.state.isFooterMusic"/>
</template>
<script >
import FootrtMusicVue from "./components/item/FootrtMusic.vue";
export default {
  components: {
    FootrtMusicVue,
  },
};
</script> 0
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
a {
  color: black;
}
</style>
