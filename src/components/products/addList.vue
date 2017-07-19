<template>
  <div class="addProducts">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品" name="first">商品</el-tab-pane>
        <el-tab-pane label="附属商品" name="second">附属商品</el-tab-pane>
        <el-tab-pane label="套餐" name="third">套餐</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
      return {
        activeName: 'second'
      };
    },
}
</script>

<style>
  
</style>
