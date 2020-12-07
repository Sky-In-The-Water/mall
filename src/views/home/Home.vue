<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control v-show="isTopFixed" :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"
                 ref="tapControl1"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommend="recommend"/>
      <future-view/>

      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tapControl2"/>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="topShow"/>

  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";


import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FutureView from "@/views/home/childComps/FutureView";
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import GoodsListItem from "@/components/content/goods/GoodsListItem";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";


import {
  getHomeMultidata,
  getHomeGoods,
} from "@/network/home";
import {itemImageListener} from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,

    HomeSwiper,
    RecommendView,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop,

    FutureView,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      currentType: 'pop',
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      topShow: false,
      tapOffsetTop: 0,
      isTopFixed: false,
      saveY: 0,
      itemListener: null

    }
  },
  mixins: [itemImageListener],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
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
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImageLoad', this.itemListener)
  },
  mounted() {
  },
  methods: {
    /**
     *
     * 事件监听方法
     * */


    tabClick(index) {
      switch (index) {
        case 0 :
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      this.$refs.tapControl1.currentIndex = index;
      this.$refs.tapControl2.currentIndex = index;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    contentScroll(position) {
      this.topShow = -(position.y) > 1000
      this.isTopFixed = -(position.y) > this.tapOffsetTop
    },
    loadMore() {
      this.getHomeGo(this.currentType)
    },

    swiperImageLoad() {

      //获取tapOffsetTop
      this.tapOffsetTop = this.$refs.tapControl2.$el.offsetTop

    },

    /**
     * 网络请求相关方法
     *
     **/
    getHomeMul() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    //调用商品数据
    getHomeGo(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: #FF8E96;
  color: white;
  font-weight: 300;
}

.tab-control {
  position: relative;
  z-index: 99;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
}
</style>
