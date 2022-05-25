<template>
    <ProductForm @submit="onSubmitted" :product="loadedProduct" />
</template>

<script>
import ProductForm from '@/components/UI/ProductForm';

export default {
  components: {
    ProductForm
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
  methods: {
    onSubmitted(editedProduct) {
      this.$store.dispatch("editProduct", editedProduct).then(() => {
        this.$router.push("/products");
      });
    }
  }
}
</script>
