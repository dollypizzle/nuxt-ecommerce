<template>
  <div>
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'

export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch('initAuth')
  }
}
</script>
