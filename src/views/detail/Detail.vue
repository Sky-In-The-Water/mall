<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>

      <detail-base-info :goods="goods"/>

      <detail-shop-info :shop="shop"/>

      <detail-goods-info :detail-info="detailInfo"/>

      <detail-param-info ref="params" :param-info="params"/>

      <detail-comment-info ref="comment" :comment-info="commentInfo"/>

      <goods-list ref="recommend" :goods="recommends"></goods-list>

    </scroll>

  </div>
</template>

<script>

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";

import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParam, getrecommend} from "@/network/detail";
import {debounce} from '@/common/utils'
import {itemImageListener} from "@/common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    GoodsParam,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      params: {},
      commentInfo: {},
      recommends: [],
      itemListener: null,
      themeTopYs: [0],
      currentIndex: 0
    }
  },
  mixins: [itemImageListener],
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //  1.获取轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //  2.获取商品数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //  3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //  4.获取商品展示图
      this.detailInfo = data.detailInfo;
      //  5.获取参数信息
      this.params = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //3.请求推荐数据
    getrecommend().then(res => {
      this.recommends = res.data.list
    })

  },
  mounted() {
    setTimeout(() => {
      this.themeTopY()
    }, 1000)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemListener)
  },
  methods: {

    imageLoad() {
      debounce(this.$refs.scroll.refresh, 500)
    },
    themeTopY() {
      this.themeTopYs = [0];
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contentScroll(position) {
      const positionY = -position.y

      let length = this.themeTopYs.length-1
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    }
  },
}
</script>

<style scoped>

#detail {
  position: relative;
  z-index: 99;
  background-color: white;
}

.content {
  height: calc(100vh - 44px);
}

.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: white;
}
</style>
