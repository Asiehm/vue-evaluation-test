<template>
   <div>
    <HeaderPage />
    <router-view />
  </div>
</template>
<script>
import HeaderPage from "./components/HeaderPage.vue";
export default {
  components: { HeaderPage },
};
</script>

