import Vuex from "vuex";
import Vue from 'vue';
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      user: null,
      loadedProducts: [],
      cart: [],
      cartCount: 0,
    },
    mutations: {
      setToken(state, token) {
        state.token = token
      },
      setUser(state, user) {
        state.user = user
      },
      clearToken(state) {
        state.token = null;
        state.user = null
      },
      setProducts(state, products) {
        state.loadedProducts = products;
      },
      addProduct(state, product) {
        state.loadedProducts.push(product)
      },
      editProduct(state, editedProduct) {
        const productIndex = state.loadedProducts.findIndex(
          product => product.id === editedProduct.id
        );
        state.loadedProducts[productIndex] = editedProduct
      },
      deleteProduct(state, removedProduct) {
        const productIndex = state.loadedProducts.indexOf(removedProduct);

        state.loadedProducts.splice(productIndex, 1)
      },
      addToCart(state, item) {
        let found = state.cart.find(
          (product) => product.id === item.id
        );

        if (found) {
          found.quantity++;
          found.totalPrice = found.quantity * found.price;
        } else {
          state.cart.push(item);

          Vue.set(item, 'quantity', 1);
          Vue.set(item, 'totalPrice', item.price);
        }

        state.cartCount++;
      },
      removeFromCart(state, item) {
        let index = state.cart.indexOf(item);

        if (index > -1) {
          let product = state.cart[index];
          state.cartCount -= product.quantity;

          state.cart.splice(index, 1);
        }
      },
      increaseQuantity(state, item) {
        let addedItem = state.cart.find(
          (product) => product.id === item.id
        );

        if (addedItem) {
          addedItem.quantity++;
          addedItem.totalPrice = addedItem.quantity * addedItem.price;
        } else {
          state.cart.push(item);

          Vue.set(item, 'quantity', 1);
          Vue.set(item, 'totalPrice', item.price);
        }

        state.cartCount++;
      },
      decreaseQuantity(state, item) {
        let addedItem = state.cart.find(
          (product) => product.id === item.id
        );

        if (addedItem) {
          addedItem.quantity--;
          addedItem.totalPrice = addedItem.quantity * addedItem.price;
        } else {
          state.cart.push(item);

          Vue.set(item, 'totalPrice', item.price);
        }

        state.cartCount--;
      },
      clearCartData(state) {
        state.cart = [];
        state.cartCount = 0;
      },
    },
    actions: {
      register(vuexContext, registerData) {
        return this.$axios.$post('/register', {
          firstname: registerData.firstname,
          lastname: registerData.lastname,
          email: registerData.email,
          phoneNumber: registerData.phoneNumber,
          password: registerData.password,
        })
        .then(res => {
          vuexContext.commit("setToken", res.token);
          vuexContext.commit("setUser", JSON.stringify(res.user));
          Cookie.set('token', res.token);
          Cookie.set('user', JSON.stringify(res.user));
        })
        .catch(e => console.log(e));
      },
      login(vuexContext, registerData) {
        return this.$axios.$post('/login', {
          email: registerData.email,
          password: registerData.password,
        })
        .then(res => {
          vuexContext.commit("setToken", res.token);
          vuexContext.commit("setUser", JSON.stringify(res.user));
          Cookie.set('token', res.token);
          Cookie.set('user', JSON.stringify(res.user));
        })
        .catch(e => console.log(e));
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("token");
        Cookie.remove("user");
      },
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("/products")
          .then((data) => {
            const productsArray = [];
            for (const key in data.products) {
              productsArray.push({ ...data.products[key], _id: key });
            }
            vuexContext.commit("setProducts", productsArray);
          })
          .catch((e) => context.error(e));
      },
      setProducts(vuexContext, products) {
        vuexContext.commit("setProducts", products);
      },
      addProduct(vuexContext, product) {
        const token =  vuexContext.state.token
        const createdProduct = {
          ...product,
        };
        return this.$axios
        .$post(
          "/products",
          createdProduct, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
        .then(data => {
          vuexContext.commit('addProduct', {...createdProduct, id: data.product.name})
          // vuexContext.commit('addProduct', {...createdProduct, id: data.product.name})
        })
        .catch(e => console.log(e));
      },
      editProduct(vuexContext, editedProduct) {
        const token =  vuexContext.state.token
        return this.$axios
        .$patch(
          "/products/" + editedProduct.id,
          editedProduct, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            vuexContext.commit('editProduct', editedProduct)
          })
          .catch(e => console.log(e))
      },
      deleteProduct(vuexContext, removedProduct) {
        const token =  vuexContext.state.token
        return this.$axios
        .$delete(
          "/products/" + removedProduct.id, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {

            vuexContext.commit('deleteProduct', removedProduct)
          })
          .catch(e => console.log(e))
      },
      initAuth(vuexContext) {
        const token = Cookie.get('token')

        if (!token) {
          return;
        }
        const user = Cookie.get('user')

        vuexContext.commit("setToken", token);
        vuexContext.commit("setUser", user);
      },
      clearCart(vuexContext) {
        vuexContext.commit('clearCartData')
      }
    },
    getters: {
      loadedProducts(state) {
        return state.loadedProducts;
      },
      cart(state) {
        return state.cart
      },
      isAuthenticated(state) {
        return state.token != null;
      },
      user(state) {
        return state.user
      },
    }
  });
}

export default createStore
