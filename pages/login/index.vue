<template>
  <mdb-container>
    <mdb-row class="d-flex justify-content-center pb-5 my-5">
      <mdb-col sm="12" md="8" lg="6">
        <mdb-card>
          <mdb-card-body>
            <p class="h4 text-center py-2">Login</p>
            <form @submit.prevent="onSubmit">
              <input
                type="email"
                class="form-control"
                placeholder="Email Address"
                required
                v-model="email"
              />
              <br />
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
                v-model="password"
              />
              <div class="text-center py-4 mt-3">
                <mdb-btn class="btn btn-outline-black" type="submit">
                  Submit
                  <mdb-icon far icon="paper-plane" class="ml-2" />
                </mdb-btn>
              </div>
            </form>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push('/products');
      });
    }
  }
};
</script>
