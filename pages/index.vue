<template>
  <mdb-container class="pb-5">
    <mdb-row class="mt-4 mb-5">
      <mdb-col md="2">
        <img
          style="height: 100px; margin-top: 35px"
          class="animated bounce infinite"
          src="data:image/png;base64,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"
        >
      </mdb-col>
      <mdb-col md="10">
        <div>
          <h4 class="mb-3">
            <strong>Flash Deals</strong>
          </h4>
        </div>
        <mdb-carousel :interval="8000" slide :items="items" indicators></mdb-carousel>
      </mdb-col>
    </mdb-row>
    <h4 class="text-center">
      <strong>Latest Products</strong>
    </h4>
    <mdb-row class="mb-5 mt-2">
      <mdb-col class="mt-4" sm="6" md="3" v-for="product in loadedProducts.slice(-4)" :key="product.id">
        <nuxt-link :to="{ path: '/products/' + product.id }">
          <img class="ImgP" v-bind:src="product.image" alt />
        </nuxt-link>
        <div class="text-center mt-2">
          <strong>{{product.name}}</strong>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          img: true,
          src:
            'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60&h=350',
        },
        {
          img: true,
          src:
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60&h=350',
        },
        {
          img: true,
          src:
            'https://images.unsplash.com/photo-1564507791227-bd8332f2566b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60&h=350',
        },
      ],
    };
  },
  computed: {
    loadedProducts(){
      return this.$store.getters.loadedProducts
    }
  }
};
</script>

<style scoped>
.ImgP {
  height: 240px;
  width: 100% !important;
  object-fit: cover !important;
}
</style>
