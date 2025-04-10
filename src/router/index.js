import { createWebHistory, createRouter } from "vue-router";
import CartPage from "../components/CartPage.vue";
import ProductList from "../components/ProductList.vue";
const routes = [
  { path: "/CartPage", component: CartPage },
  { path: "/", component: ProductList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
