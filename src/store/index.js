import { createStore } from "vuex";
export default createStore({
  state: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {},
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    customers: [
      { id: 1, name: "Ahmad", city: "Tehran" },
      { id: 2, name: "Mehran", city: "Shiraz" },
      { id: 3, name: "Ali", city: "Esfahan" },
    ],
    products: [
      { id: 101, name: "Laptop", category: "Electronics" },
      { id: 102, name: "Mouse", category: "Electronics" },
      { id: 103, name: "Monitor", category: "Electronics" },
      { id: 104, name: "Coffee Maker", category: "Home Appliances" },
      { id: 105, name: "Blender", category: "Home Appliances" },
      { id: 106, name: "Headphones", category: "Electronics" },
    ],
  },
  actions: {
    addtocart({ commit }, { customerId, product }) {
      commit("ADD_TO_PRODUCT", { customerId, product });
    },
    removeproduct({ commit }, { customerId, product }) {
      commit("REMOVE_PRODUCT", { customerId, product });
    },
  },
  mutations: {
    ADD_TO_PRODUCT(state, { customerId, product }) {
      if (!state.cart[customerId]) {
        state.cart[customerId] = [];
      }
      state.cart[customerId].push(product);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log(state.cart[customerId]);
    },
    REMOVE_PRODUCT(state, { customerId, product }) {
      if (state.cart[customerId]) {
        state.cart[customerId] = state.cart[customerId].filter(
          (id) => id !== product
        );
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});
