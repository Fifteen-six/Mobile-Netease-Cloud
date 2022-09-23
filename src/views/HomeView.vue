<template>
  <div>
    <TopNavVue />
    <SwpierVue />
    <locnList />
    <MusicList />
  </div>
</template>

<script>
// @ is an alias to /src
import SwpierVue from "@/components/home/Swpier.vue";
import TopNavVue from "@/components/home/TopNav.vue";
import locnList from "../components/home/lconList.vue";
import MusicList from "../components/home/MusicList.vue";
export default {
  name: "HomeView",
  components: { TopNavVue, SwpierVue, locnList, MusicList },
};
</script>
