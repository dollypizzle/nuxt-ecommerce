<template>
  <mdb-container class="pub">
    <mdb-row>
      <mdb-col class="mt-4" md="6">
        <h3>
          <strong>{{ loadedProduct.name }}</strong>
        </h3>
        <p>
          <strong>Brand:</strong>
          {{ loadedProduct.brand }}
        </p>
        <div>
          <img alt v-bind:src="loadedProduct.image" class="img-fluid w-75 ImgP" />
        </div>
        <div>
          <p class="pt-4">₦ {{ loadedProduct.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</p>
          <mdb-btn class="beat mb-4" @click="addToCart(loadedProduct)" color="black">Add to cart</mdb-btn>
        </div>
      </mdb-col>
      <mdb-col class="mt-md-5" md="6">
        <p class="text-justify mt-md-3">
          <strong>Description:</strong>
          {{ loadedProduct.description }}
        </p>
        <div class="d-flex">
          <div v-if="ownerId === loadedProduct.owner_id">
            <mdb-btn color="success">
              <nuxt-link :to="'/products/edit/' + loadedProduct.id">
                <a class="text-reset">Edit</a>
              </nuxt-link>
            </mdb-btn>
            <mdb-btn @click="deleted(loadedProduct)" color="danger">Delete</mdb-btn>
          </div>
          <mdb-btn color="primary">
            <nuxt-link to="/products">
              <a class="logg">Back to products</a>
            </nuxt-link>
          </mdb-btn>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
export default {
  data() {
    return {
      ownerId: ''
    }
  },
  asyncData(context) {
    return context.app.$axios.$get('/products/' + context.params.id)
    .then(data => {
      return {
        loadedProduct: data.product
      }
    })
    .catch(e => context.error(e))
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    if (this.user) {
      const authUser = JSON.parse(this.user)
      this.ownerId = authUser.id
    }
  },
  methods: {
    deleted(removedProduct) {
      this.$store.dispatch("deleteProduct", removedProduct).then(() => {
        this.$router.push("/products");
      });
    },
    addToCart(product) {
      this.$store.commit('addToCart', product);
      alert('item added to cart');
    },
  }
};
</script>

<style scoped>
.ImgP {
  min-width: 335px;
  min-height: 335px;
}
.pub {
  padding-bottom: 6rem;
}
.beat {
  border-radius: 10em;
}
.logg {
  color: white !important;
}
</style>
