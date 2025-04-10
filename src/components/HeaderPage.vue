<template>
  <div class="flex justify-between p-4 bg-red-800 rounded-lg text-white mb-3">
    <span>Logo</span>
    <div class="flex flex-col" @click="CartPage()">
      <ShoppingCartIcon class="w-7 h-7" />
      <span class="text-white font-bold -mt-11 ml-4">{{ this.cartItem }}</span>
    </div>
  </div>
</template>
<script>
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
export default {
  components: { ShoppingCartIcon },
  computed: {
    cartItem() {
      let user = JSON.parse(localStorage.getItem("user"));
      let cartCount=this.$store.state.cart
      console.log(cartCount )
      
      if (user != null && Object.keys(cartCount).length !== 0) {
        let customer = this.$store.state.customers.find((c) => c.name === user);
        console.log(this.$store.state.cart[customer.id].length)
        return this.$store.state.cart[customer.id].length;
      } else return 0
    },
  },
  methods: {
    CartPage() {
      this.$router.push("/CartPage");
    },
  },
};
</script>
