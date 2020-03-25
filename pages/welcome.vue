<template>
  <div class="row">
    <div class="col-md-12">
      <p v-if="$fetchState.pending">Fetching menu...</p>
      <p v-else-if="$fetchState.error">Error while fetching menu: {{ $fetchState.error.message }}</p>
      <div v-else>
        <div v-for="category of categories" :key="categories.id" class="mt-4">
          <h2>{{ category.title }}</h2>
          <p>{{ category.description }}</p>
          <div class="row">
            <product-item
              v-for="product of category.products"
              :key="product.id"
              :pid="product.id"
              :title="product.title"
              :description="product.description"
              :image="product.image"
              :price="product.price"
              :price_format="product.price_format"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'core-js/fn/promise/finally'
import axios from 'axios';
import ProductItem from '../components/ProductItem';

export default {
  layout: 'auth',

  components: {
    ProductItem
  },

  head () {
    return { title: this.$t('home') }
  },

  data: () => ({
    title: process.env.appName,
    categories: []
  }),

  async fetch () {
    let { data } = await axios.get('/categories');
    this.categories = data.data;
  },

  mounted() {
    this.$bus.$on('currency-changed', () => {
      this.$fetch();
    })
  },

  computed: mapGetters({
    authenticated: 'auth/check'
  })
}
</script>