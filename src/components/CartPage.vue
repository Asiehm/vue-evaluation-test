<template>
  <div class="bg-slate-50 p-4 rounded-lg shadow-sm max-w-4xl mx-auto">
  <h2 class="text-2xl font-bold text-center mb-6 text-red-800">سبد خرید شما</h2>

  <div v-if="cardList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="product in cardList"
      :key="product.id"
      class="bg-white shadow-md rounded-xl p-4 flex flex-col items-center justify-between"
    >
      <img src="../assets/img/img.png" :alt="product.name" class="w-32 h-32 object-cover mb-4" />
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mb-2">دسته: {{ product.category }}</p>

      <button
        @click="removeProduct(product.id)"
        class="mt-4 px-6 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full transition"
      >
        حذف از سبد
      </button>
    </div>
  </div>

  <div v-else class="text-center text-gray-500 mt-20">
    <p class="text-lg">سبد خرید شما خالی است ☹️</p>
  </div>
</div>


  <div class="max-w-4xl mx-auto bg-slate-50 rounded-xl p-6 shadow-md mt-8">
  <h2 class="text-2xl font-bold text-red-700 mb-6 text-center">لیست خرید مشتری‌ها</h2>

  <div v-for="customer in customersWithProducts" :key="customer.id" class="mb-6">
    <div class="bg-white border border-red-100 p-4 rounded-lg shadow-sm">
      <h3 class="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
        👤 {{ customer.name }}
      </h3>

      <div v-if="customer.purchasedProducts.length">
        <ul class="space-y-2">
          <li
            v-for="product in customer.purchasedProducts"
            :key="product.id"
            class="flex justify-between items-center bg-red-50 p-3 rounded-md border border-red-200"
          >
            <span class="font-medium text-slate-700">{{ product.name }}</span>
            <span class="text-sm text-slate-500">({{ product.category }})</span>
          </li>
        </ul>
      </div>
      <div v-else class="text-slate-400 text-sm mt-2">هنوز محصولی خریداری نشده.</div>
    </div>
  </div>
</div>

<div class="max-w-4xl mx-auto bg-slate-50 rounded-xl p-6 shadow-md mt-8">
  <h2 class="text-2xl font-bold text-center text-red-700 mb-6">
    📊 محبوب‌ترین دسته‌بندی خرید هر کاربر
  </h2>

  <div v-if="Object.keys(favouritProduct).length > 0" class="divide-y divide-gray-200">
    <div
      v-for="(category, customer) in favouritProduct"
      :key="customer"
      class="flex justify-between items-center bg-white border border-red-100 p-4 rounded-lg shadow-sm mb-2"
    >
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <div class="w-10 h-10 bg-red-100 text-red-600 flex items-center justify-center rounded-full font-bold">
          {{ customer[0] }}
        </div>
        <span class="text-gray-700 font-medium">{{ customer }}</span>
      </div>

      <span
        class="bg-red-50 text-red-600 text-sm font-semibold px-4 py-1 rounded-full border border-red-200"
      >
        {{ category }}
      </span>
    </div>
  </div>

  <div v-else class="text-center text-gray-500 mt-6">
    هیچ خریدی ثبت نشده است 😶
  </div>
</div>

</template>
<script>
import { TrashIcon } from "@heroicons/vue/24/outline";
export default {
  name: "CartPage",
  components:{TrashIcon},
  
  computed: {
    cardList() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) return [];

    let customer = this.$store.state.customers.find(c => c.name === user);
    if (!customer) return [];

    let productIds = this.$store.state.cart[customer.id] || [];

    // دسترسی به اطلاعات کامل محصولات از لیست products
    return productIds.map(id => {
      return this.$store.state.products.find(p => p.id === id);
    }).filter(p => p); // حذف nullها در صورت نبود محصول
  },
  customersWithProducts() {
    const customers = this.$store.state.customers;
    const cart = this.$store.state.cart;
    const products = this.$store.state.products;

    return customers.map((customer) => {
      const customerCart = cart[customer.id] || [];

      const purchasedProducts = customerCart
        .map((productId) => products.find((p) => p.id === productId))
        .filter((p) => p); // حذف موارد null در صورت نبود محصول

      return {
        ...customer,
        purchasedProducts,
      };
    });
  },
  favouritProduct() {
    const customers = this.$store.state.customers;
    const cart = this.$store.state.cart;
    const products = this.$store.state.products;

    const result = {};

    for (let customer of customers) {
      const cartItemIds = cart[customer.id] || [];

      const categoryCount = {};
      for (let id of cartItemIds) {
        const product = products.find(p => p.id === id);
        if (product) {
          const cat = product.category;
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        }
      }

      let maxCategory = null;
      let maxCount = 0;
      for (let [cat, count] of Object.entries(categoryCount)) {
        if (count > maxCount) {
          maxCategory = cat;
          maxCount = count;
        }
      }

      result[customer.name] = maxCategory || "هیچ خریدی انجام نشده";
    }

    return result;
  }
},
  
  methods:{
    removeProduct(id){
      let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      let customer = this.$store.state.customers.find((c) => c.name === user);
      this.$store.dispatch("removeproduct",{customerId: customer.id,
        product: id})
    }
    
  }
}
  

};
</script>
