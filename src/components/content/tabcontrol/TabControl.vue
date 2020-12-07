<template>
  <div class="tabControl">
    <div v-for="(item,index) in titles" class="tabControlItem " :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tabControl {
  display: flex;
  text-align: center;
  height: 40px;
  background-color: white;
  line-height: 40px;
  font-size: 12px;
}

.tabControlItem {
  flex: 1;
}

.tabControlItem span {
  padding: 5px;
}

.active span {
  border-bottom: 2px solid #FD7E96;
}
</style>
