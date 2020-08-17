<template>
    <ProductForm @submit="onSubmitted" />
</template>

<script>
import ProductForm from '@/components/UI/ProductForm';

export default {
  components: {
    ProductForm
  },
  methods: {
    onSubmitted(postData) {
      this.$store.dispatch("addProduct", postData).then(() => {
        this.$router.push("/products");
      });
    }
  }
}
</script>
