<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>

.recommend {
  display: flex;
  width: 100%;
  font-size: 14px;
  text-align: center;

  padding: 10px 0 15px;
  border-bottom: 10px solid #efecec;
}

.recommendItem {
  flex: 1;
}
.recommendItem img{
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>
