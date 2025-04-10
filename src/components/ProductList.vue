<template>
  <div class="grid grid-cols-3 gap-4 justify-center items-center">
    <ProductItem />
  </div>
</template>
<script>
import ProductItem from "./ProductItem.vue";
export default {
  components: { ProductItem },
};
</script>
