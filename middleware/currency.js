import axios from 'axios'

export default async ({ store }) => {
  if (process.server) {
    const currency = store.getters['currency/currency'];
    if (currency) {
      axios.defaults.headers.common['x-currency'] = currency
    }
  }
}
