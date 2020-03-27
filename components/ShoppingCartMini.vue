<template>
    <div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#shoppingCart">
            Cart: {{ numInCart }} <span v-if="numInCart>0">| {{total_format}}</span>
        </button>

        <div id="shoppingCart" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Shopping cart</h5>
                        <button class="close" data-dismiss="modal">
                            &times;
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table" v-if="cart.length>0">
                            <tbody>

                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Sum</th>
                                <th></th>
                            </tr>

                            <shopping-cart-item
                                    v-for="item in cart"
                                    :key="item.id"
                                    :product="item"
                                    :quantity="item.quantity"
                            />
                            <tr>
                                <td colspan="4">Total:</td>
                                <th>{{ total_format}}</th>
                                <th></th>
                            </tr>
                            </tbody>
                        </table>
                        <p v-else class="text-center">The cart is empty!</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>

                        <router-link :to="{ name: 'checkout' }" class="btn btn-primary" data-dismiss="modal"
                                     v-if="cart.length>0">
                            Checkout
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {mapGetters} from 'vuex'
    import ShoppingCartItem from "../components/ShoppingCartItem";

    export default {
        name: 'ShoppingCartMini',
        components: {
            ShoppingCartItem
        },
        computed: {
            ...mapGetters({
                inCart: 'cart/cart'
            }),
            numInCart() {
                return this.inCart.length;
            }
        },
        data: () => ({
            cart: [],
            total: 0,
            total_format: "0"
        }),
        mounted() {
            this.$bus.$on('update-basket', () => {
                this.getCart();
            });

            this.$bus.$on('currency-changed', () => {
                this.getCart();
            });

            this.$bus.$on('clear-cart', () => {
                this.cart = [];
                this.total_format = 0;
            });

            this.getCart();
        },
        methods: {
            removeFromCart(index) {
                this.$store.dispatch('cart/removeItem', index);
            },
            async getCart() {
                if (this.inCart.length > 0) {
                    let {data} = await axios.post('/cart', {'items': this.inCart});
                    this.$set(this, 'cart', data.items);
                    this.$set(this, 'total_format', data.total_format);
                } else {
                    this.$set(this, 'cart', []);
                    this.$set(this, 'total_format', 0);
                }
            }
        }
    };
</script>