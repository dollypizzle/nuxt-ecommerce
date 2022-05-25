<template>
  <div v-if="$store.state.cart.length > 0" class="pub">
    <mdb-card>
      <mdb-card-body>
        <mdb-tbl responsive>
          <mdb-tbl-head color="mdb-color" class="lighten-5">
            <tr>
              <th></th>
              <th>
                <strong>Product</strong>
              </th>
              <th>
                <strong>Price</strong>
              </th>
              <th>
                <strong>QTY</strong>
              </th>
              <th>
                <strong>Amount</strong>
              </th>
              <th></th>
            </tr>
          </mdb-tbl-head>

          <mdb-tbl-body v-for="item in $store.state.cart" :key="item.id">
            <tr>
              <th id="yato" scope="row">
                <img v-bind:src="item.image" alt class="img-fluid z-depth-0 log" />
              </th>
              <td>
                <h5 class="pt-5">
                  <strong>{{item.name}}</strong>
                </h5>
              </td>
              <td class="pad">₦{{item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</td>
              <td class="pad">{{item.quantity}}</td>
              <td class="pad">
                <strong>₦{{(item.quantity * item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</strong>
              </td>
              <td>
                <div class="d-flex justify-content-end">
                  <mdb-btn
                    @click="increaseQuantity(item)"
                    title="Increase quantity"
                    color="success"
                    size="sm"
                  >
                    <i class="fas fa-plus"></i>
                  </mdb-btn>
                </div>
                <div class="d-flex justify-content-end">
                  <mdb-btn
                    :disabled="item.quantity === 1"
                    @click="decreaseQuantity(item)"
                    title="Decrease quantity"
                    color="info"
                    size="sm"
                  >
                    <i class="fas fa-minus"></i>
                  </mdb-btn>
                </div>
                <div class="d-flex justify-content-end">
                  <mdb-btn
                    @click="removeFromCart(item)"
                    title="Remove item"
                    color="danger"
                    size="sm"
                  >
                    <i class="far fa-trash-alt"></i>
                  </mdb-btn>
                </div>
              </td>
            </tr>
          </mdb-tbl-body>
        </mdb-tbl>
      </mdb-card-body>
    </mdb-card>
    <div class="text-center">
      <h2 class="my-4">
        <strong>Total: ₦{{ totalPrice }}</strong>
      </h2>
      <mdb-btn class="mr-3 beat">
        <router-link to="/products">
          <a class="logg">Continue Shopping</a>
        </router-link>
      </mdb-btn>
      <mdb-btn v-if="!auth" class="mr-3 beat" color="primary">
        <router-link to="/login">
          <a class="logg">Proceed to Checkout</a>
        </router-link>
      </mdb-btn>
      <mdb-btn v-if="auth" class="mr-3 beat" color="primary">
        <router-link to="/checkout">
          <a class="logg">Proceed to Checkout</a>
        </router-link>
      </mdb-btn>
    </div>
  </div>
  <div v-else>
    <h2 class="text-center my-5">Your shopping cart is empty</h2>
  </div>
</template>

<script>
import {
  mdbCard,
  mdbCardBody,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  mdbBtn,
} from 'mdbvue';
export default {
  components: {
    mdbCard,
    mdbCardBody,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbBtn,
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
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item);
    },
    increaseQuantity(item) {
      this.$store.commit('increaseQuantity', item);
    },
    decreaseQuantity(item) {
      this.$store.commit('decreaseQuantity', item);
    },
  },
};
</script>

<style scoped>
.log {
  max-height: 150px;
  min-width: 50px;
}
#yato {
  max-width: 200px !important;
}
.pad {
  padding-top: 4.3rem;
}
.beat {
  border-radius: 10em;
}
.logg {
  color: white !important;
}
.pub {
  padding-bottom: 5rem;
}
</style>
