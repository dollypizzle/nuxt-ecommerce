<template>
  <mdb-navbar expand="large" dark color="black">
    <mdb-navbar-brand to="/">Dolmart</mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <mdb-nav-item to="/" active>Home</mdb-nav-item>
        <mdb-nav-item to="/products" active>Products</mdb-nav-item>
        <mdb-nav-item to="/register" v-if="!auth" active>Signup</mdb-nav-item>
        <mdb-nav-item to="/login" v-if="!auth" active>Login</mdb-nav-item>
        <mdb-nav-item to="/cart" active>Cart</mdb-nav-item>
        <mdb-nav-item v-if="auth" @click="onLogout">logout</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
} from 'mdbvue';
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push("/products");
    },
  },
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
  }
};
</script>
