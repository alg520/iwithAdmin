<template>
  <div class="addProducts">
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品" name="first">
        <addProduct></addProduct>
      </el-tab-pane>      
    </el-tabs>
  </div>
</template>

<script>
import addProduct from '../forms/addProduct.vue';
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  components: {
    addProduct
  }
}
</script>

<style>
  .addProductForm .el-form-item__content {
      text-align: left;
  }
</style>
