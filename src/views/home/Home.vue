<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <home-swiper :banner="banner"></home-swiper>

    <recommend-view :recommend="recommend"/>

    <future-view/>

    <tab-control :titles="['流行','新款','精选']" class="tab-control"/>


    <ul>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
      <li>占位</li>
    </ul>

  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";


import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FutureView from "@/views/home/childComps/FutureView";
import TabControl from "@/components/content/TabControl";


import {
  getHomeMultidata,
  getHomeGoods,
} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,

    HomeSwiper,
    RecommendView,
    TabControl,

    FutureView,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      }
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMul();
    //2.请求商品数据
    this.getHomeGo('pop');
    this.getHomeGo('new');
    this.getHomeGo('sell');

  },
  methods: {
    getHomeMul() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    getHomeGo(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: #FF8E96;
  color: white;
  font-weight: 300;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
}

.tab-control {
  position: sticky;
  top: 44px;
}
</style>
