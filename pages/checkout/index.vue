<template>
  <mdb-container v-if="$store.state.cart.length > 0" class="pub">
    <mdb-row>
      <mdb-col md="6">
        <h4 class="text-center mt-4">Order Summary</h4>
        <mdb-card-body>
          <mdb-tbl>
            <mdb-tbl-head color="mdb-color" class="lighten-5">
              <tr>
                <th>
                  <strong>Product</strong>
                </th>
                <th>
                  <strong>QTY</strong>
                </th>
                <th>
                  <strong>Amount</strong>
                </th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body v-for="item in $store.state.cart" :key="item.id">
              <tr>
                <td>
                  <h5>
                    <strong>{{item.name}}</strong>
                  </h5>
                </td>
                <td class="pl-3">{{item.quantity}}</td>
                <td class="pl-3">
                  <strong>₦{{(item.quantity * item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</strong>
                </td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
          <h4 class="mt-4 text-center">
            <strong>Total: ₦{{ totalPrice }}</strong>
          </h4>
          <div class="mt-4 pl-3">
            <nuxt-link to="/cart">
              <a class="btn btn-outline-black">MODIFY CART</a>
            </nuxt-link>
          </div>
        </mdb-card-body>
      </mdb-col>
      <mdb-col md="6" class="mt-4">
        <h4 class="text-center mt-1">Checkout</h4>
        <form @submit.prevent="onClearCart">
          <div class="grey-text">
            <mdb-input
              label="First Name"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
            />
            <mdb-input
              label="Last Name"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
            />
            <mdb-input
              label="Email"
              icon="envelope"
              group
              type="email"
              validate
              error="wrong"
              success="right"
              required
            />
            <mdb-input
              label="Shipping Address"
              icon="tag"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
            />
          </div>
          <div>
            <mdb-btn type="submit" color="success">Confirm Order</mdb-btn>
          </div>
        </form>
      </mdb-col>
    </mdb-row>
  </mdb-container>
  <div v-else>
    <h2 class="text-center my-5">Your shopping cart is empty</h2>
  </div>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbInput,
  mdbCardBody,
  mdbBtn,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
} from 'mdbvue';
export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbCardBody,
    mdbBtn,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let item of this.$store.state.cart) {
        total += item.totalPrice;
      }
      return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    onClearCart() {
      this.$store.dispatch('clearCart');
      this.$router.push('/order');
    },
  },
};
</script>

<style scoped>
.pub {
  padding-bottom: 6rem;
}
</style>
