<template>
  <div id="detail-nar-bar">
    <nav-bar >

      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div slot="center" class="title">
        <div class="title-item" v-for="(item,index) in title" :class="{active:index===currentIndex}" @click="detailClick(index)">{{item}}</div>
      </div>


    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }
  },
  methods:{
    detailClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>

.title {
  display: flex;
}
.title-item{
  flex: 1;
  font-size: 12px;
}
.active{
  color: #FD728C;
}
.back img{
  margin-top: 12px;
}
</style>
