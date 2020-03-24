<template>
    <div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#shoppingCart">Cart ({{ numInCart }})</button>

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
                        <table class="table">
                            <tbody>
                                <tr v-for="(item, index) in inCart">
                                    <td>{{ item.id}}</td>
                                    <td>{{ item.quantity}}</td>
                                    <!--<td>{{ item.product.title }}</td>
                                    <td>{{ item.product.price}}</td>
                                    <td>{{ item.quantity}}</td>-->
                                    <td>
                                        <button class="btn btn-sm btn-danger" @click.prevent="removeFromCart(index)">&times;</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>{{ total}}</th>
                                    <th></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
                        <button class="btn btn-primary">Check out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters } from 'vuex'
    import AsyncComputed from 'vue-async-computed'

    export default {
        name: 'shoppingCart',
        components: {
            AsyncComputed
        },
        computed: {
            ...mapGetters({
                inCart: 'cart/cart'
            }),
            numInCart() {
                return this.inCart.length;
            },
            total() {
                return 0;//this.cart.reduce((acc, cur) => acc + cur.price, 0);
            },
        },
        asyncComputed: {
            async products(){
                let cart = this.inCart;
                let products = [];
                let productsWithKey = [];

                if(this.numInCart>0)
                {
                    let str = "";
                    for (var i = 0; i < cart.length; i++) {
                        if(str!=="")
                            str+="&";

                        str+="id[]="+cart[i].id;
                    }

                    let { data } = await axios.get('/products?'+str);
                    products = data.data;

                    for (i = 0; i < products.length; i++) {
                        //productsWithKey[products[i].id] = products[id]
                    }
                }

                return productsWithKey;
            }
        },
        methods: {
            removeFromCart(index) {
                this.$store.dispatch('cart/removeItem', index);
            }
        },
    };
</script>