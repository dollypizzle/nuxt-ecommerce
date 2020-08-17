<template>
  <mdb-container>
    <mdb-row class="d-flex justify-content-center my-5 pb-5">
      <mdb-col md="6">
        <mdb-card>
          <mdb-card-body>
            <form @submit.prevent="onSave">
              <p class="h4 text-center py-2">Add New Product</p>
              <input type="text" class="form-control" placeholder="Name" v-model="editedProduct.name" required />
              <br />
              <input type="text" class="form-control" placeholder="Brand" v-model="editedProduct.brand" required />
              <br />
              <input
                type="number"
                class="form-control"
                placeholder="Price"
                v-model="editedProduct.price"
                required
              />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Image url"
                v-model="editedProduct.image"
                required
              />
              <br />
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="editedProduct.description"
                required
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
  props: {
    product: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      editedProduct: this.product ? { ...this.product } : {
        name: '',
        price: '',
        brand: '',
        image: '',
        description: '',
      }
    };
  },

  methods: {
    onSave() {
      // save the product
      this.$emit('submit', this.editedProduct)
    }
  }

};
</script>
