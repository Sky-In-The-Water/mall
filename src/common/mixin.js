import {debounce} from "@/common/utils";

export const itemImageListener={
  mounted(){
    //1.监听Item的图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    //2.保存监听事件
    this.itemListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemListener)

  }
}
