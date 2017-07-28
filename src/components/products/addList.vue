<template>
  <div class="addProducts">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品" name="first">
        <addProduct></addProduct>
      </el-tab-pane>
      <el-tab-pane label="附属商品" name="second">
        <addAuxiliary></addAuxiliary>
      </el-tab-pane>
      <el-tab-pane label="套餐" name="third">
        <addSetmeal></addSetmeal>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import addProduct from '../forms/addProduct.vue';
import addAuxiliary from '../forms/addAuxiliaryProduct.vue';
import addSetmeal from '../forms/addSetmealProduct.vue';
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  components: {
    addProduct,addAuxiliary,addSetmeal
  }
}
</script>

<style>
  .addProductForm .el-form-item__content,.addAuxiliaryForm .el-form-item__content,.addSetmealForm .el-form-item__content {
      text-align: left;
  }
</style>
