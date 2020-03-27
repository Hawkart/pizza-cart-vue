<template>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button"
           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
        >
            {{ currencies[currency] }}
        </a>
        <div class="dropdown-menu">
            <a v-for="(value, key) in currencies" :key="key" class="dropdown-item" href="#"
               @click.prevent="setCurrency(key)"
            >
                {{ value }}
            </a>
        </div>
    </li>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: mapGetters({
            currency: 'currency/currency',
            currencies: 'currency/currencies'
        }),

        methods: {
            setCurrency(currency) {
                if (this.currency !== currency) {
                    this.$store.dispatch('currency/setCurrency', {currency})
                    this.$bus.$emit('currency-changed')
                }
            }
        }
    }
</script>