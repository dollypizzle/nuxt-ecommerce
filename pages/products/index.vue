<template>
  <mdb-container class="mt-4 pub">
    <mdb-row>
      <mdb-col>
        <mdb-jumbotron>
          <h2 class="h1 display-3 text-center mb-5">Dolmart Phone Hub</h2>
          <p class="text-center">
            <mdb-btn v-if="auth" color="black">
              <nuxt-link to="/products/new">
                <a class="log">Add New Products</a>
              </nuxt-link>
            </mdb-btn>
          </p>
        </mdb-jumbotron>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col lg="3" md="6" v-for="product in loadedProducts" :key="product.id">
        <mdb-card class="mb-4" cascade ecommerce wide>
          <img class="ImgP" v-bind:src="product.image" alt="Card Image" />
          <mdb-card-body cascade class="text-center">
            <mdb-card-title>
              <nuxt-link :to="'/products/' + product.id">
                <a title="Click to view more info">
                  <strong style="color: black">{{ product.name }}</strong>
                </a>
              </nuxt-link>
            </mdb-card-title>
            <div>
              <span class="float-left">
                ₦
                {{
                  parseFloat(product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                }}
              </span>
              <span class="float-right">
                <mdb-btn
                  tag="a"
                  @click="addToCart(product)"
                  size="lg"
                  class="p-1 m-0 mr-2 z-depth-0"
                >
                  <mdb-icon title="Add To Cart" icon="shopping-cart" />
                </mdb-btn>
              </span>
            </div>
          </mdb-card-body>
          <div class="align-self-center mb-4">
            <button type="button" class="btn btn-outline-black waves-effect">
              <nuxt-link :to="'/products/' + product.id">
                <a style="color: black">Show More info</a>
              </nuxt-link>
            </button>
          </div>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
export default {
  computed: {
    loadedProducts() {
      return this.$store.getters.loadedProducts;
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product);
      alert('Item added to cart!!!');
    },
  },
};
</script>

<style scoped>
.log {
  color: white !important;
}
.ImgP {
  height: 240px;
  width: 100% !important;
  object-fit: cover !important;
}
.pub {
  padding-bottom: 5rem;
}
</style>
