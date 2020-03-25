<template>

    <tr>
        <td>
            <img :src="product.image" class="card-img-top w-50px">
        </td>
        <td>{{ product.title }}</td>
        <td>
            <vue-number-input v-model="q" :min="1" :max="100" inline controls></vue-number-input>
        </td>
        <td>{{ product.price_format }}</td>
        <td>{{ product.sum_format }}</td>
        <td>
            <button class="btn btn-sm btn-danger" @click.prevent="removeFromCart(product.id)">&times;</button>
        </td>
    </tr>

</template>

<script>
    import VueNumberInput from '@chenfengyuan/vue-number-input';

    export default {
        name: 'ShoppingCartItem',
        components: {
            VueNumberInput
        },
        props: ['product', 'quantity'],
        data () {
            return {
                q: this.quantity
            }
        },
        methods: {
            removeFromCart(pid) {
                this.$store.dispatch('cart/removeItem', pid);
                this.$bus.$emit('update-basket')
            },
        },
        watch: {
            "q": function (newValue, oldValue) {
                this.$store.dispatch('cart/setItem', {id: this.product.id, quantity: newValue});
                this.$bus.$emit('update-basket')
            }
        }
    };
</script>