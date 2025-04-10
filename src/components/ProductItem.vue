<template>
  <div
    v-for="pro in this.productList"
    :key="pro.id"
    class="flex flex-col justify-center items-center bg-red-100 rounded-md"
  >
    <img src="../assets/img/img.png" :alt="pro.name" class="w-64 h-64 p-4" />
    <div class="flex mt-2">
      <span>{{ pro.name }} </span>
      <span> - {{ pro.category }}</span>
    </div>
    <button
  class="px-8 py-2 border border-red-600 bg-red-400 rounded-3xl font-bold mt-5 mb-2 text-slate-200"
  type="button"
  @click="changeCart(pro)"
  :class="{
    'cursor-not-allowed bg-red-500': isProductInCart.includes(pro.id),
    'cursor-pointer': !isProductInCart.includes(pro.id)
  }"
>
  <span>{{ isProductInCart.includes(pro.id) ? "Is Cart" : "Add To Cart" }}</span>
</button>

  </div>
  <div
    class="fixed h-screen w-screen top-0 bg-gray-500/50 z-30 left-0 right-0"
    v-if="openModal"
  >
    <div class="bg-white rounded-lg w-1/4 mx-auto mt-[10%] p-4" @click.stop>
      <h3 class="text-center font-bold">ورود به حساب کابری</h3>
      <hr class="border-brand/50 my-4" />
      <input
        type="text"
        v-model="username"
        placeholder="نام کابری"
        class="p-2 w-full bg-white border border-slate-300 rounded-md"
      />
      <button
        class="px-8 py-2 border border-red-600 bg-red-400 rounded-3xl font-bold mt-5 mb-2 text-slate-200"
        type="button"
        @click="setUser(this.username)"
      >
        ورود
      </button>
    </div>
  </div>
</template>
<script>
import { products } from "../data/data";
export default {
  name: "ProductItem",
  data() {
    return {
      productList: [],
      openModal: false,
      username: "",
    };
  },
  created() {
    this.productList = products;
  },
  methods: {
    changeCart(pro) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      let customer = this.$store.state.customers.find((c) => c.name === user);

      // بررسی اینکه آیا محصول قبلاً در سبد خرید است یا خیر
      const isInCart = this.isProductInCart.includes(pro.id);
      console.log("Is in cart:", isInCart); // لاگ برای بررسی وضعیت محصول در سبد خرید

      if (isInCart) {
        // اگر محصول در سبد خرید است، آن را حذف کن
        this.$store.dispatch("removefromcart", {
          customerId: customer.id,
          product: pro.id,
        });
      } else {
        // اگر محصول در سبد خرید نیست، آن را اضافه کن
        this.$store.dispatch("addtocart", {
          customerId: customer.id,
          product: pro.id,
        });
      }
    } else {
      this.openModal = true;
    }
  },
    
    setUser(username) {
      localStorage.setItem("user", JSON.stringify(username));
      this.openModal = false;
    },

},
computed: {
  isProductInCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return [];

    const customer = this.$store.state.customers.find((c) => c.name === user);
    if (!customer) return [];

    // دریافت آی‌دی‌های محصولات در سبد خرید مشتری
    const customerCart = this.$store.state.cart[customer.id];
    return customerCart || [];  // اگر سبد خرید خالی باشد، یک آرایه خالی برمی‌گرداند
  },
},



};
</script>
