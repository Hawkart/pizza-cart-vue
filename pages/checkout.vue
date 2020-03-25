<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <card title="Your order">
                    <div>
                        <table class="table" v-if="cart.length>0">
                            <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Sum</th>
                            </tr>
                            <tr
                                    v-for="product in cart"
                                    :key="product.id"
                            >
                                <td>
                                    <img :src="product.image" class="card-img-top w-50px">
                                    {{ product.title }}
                                </td>
                                <td>
                                    {{ product.quantity }}
                                </td>
                                <td>{{ product.price_format }}</td>
                                <td>{{ product.sum_format }}</td>
                            </tr>
                            <tr>
                                <td colspan="3"></td>
                                <th>{{ prods_total_format}}</th>
                            </tr>
                            </tbody>
                        </table>
                        <p v-else class="text-center">The cart is empty!</p>
                    </div>
                </card>
            </div>
        </div>

        <form @submit.prevent="order" @keydown="form.onKeydown($event)">
            <div class="row">
                <div class="col-lg-8 mt-5 d-flex">
                    <card title="Personal data" class="w-100">
                        <!-- Name -->
                        <div class="form-group row">
                            <label class="col-md-12 col-form-label">{{ $t('name') }}</label>
                            <div class="col-md-12">
                                <input v-model="form.name" :class="{ 'is-invalid': form.errors.has('name') }" type="text" name="name" class="form-control">
                                <has-error :form="form" field="name" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-12 col-form-label">{{ $t('email') }}</label>
                            <div class="col-md-12">
                                <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" type="email" name="email" class="form-control">
                                <has-error :form="form" field="email" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-12 col-form-label">Phone</label>
                            <div class="col-md-12">
                                <input v-model="form.phone" :class="{ 'is-invalid': form.errors.has('phone') }" type="text" name="phone" class="form-control">
                                <has-error :form="form" field="phone" />
                            </div>
                        </div>
                    </card>
                </div>

                <div class="col-lg-4 mt-5 d-flex">
                    <card title="Delivery & Payment">
                        <div class="form-group row">
                            <label class="col-md-12 col-form-label">Choose Delivery method</label>
                            <div class="col-md-12">
                                <select v-model="form.delivery" :class="{ 'is-invalid': form.errors.has('delivery') }" name="delivery" class="form-control">
                                    <option v-for="delivery in deliveries" v-bind:value="delivery.value">
                                        {{ delivery.description }}
                                    </option>
                                </select>
                                <has-error :form="form" field="delivery" />
                            </div>
                        </div>

                        <div class="form-group row" v-if="form.delivery==1">
                            <label class="col-md-12 col-form-label">Address</label>
                            <div class="col-md-12">
                                <textarea v-model="form.address" :class="{ 'is-invalid': form.errors.has('address') }" name="address" class="form-control"></textarea>
                                <has-error :form="form" field="address" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-12 col-form-label">Choose Payment method</label>
                            <div class="col-md-12">
                                <select v-model="form.payment" :class="{ 'is-invalid': form.errors.has('payment') }" name="payment" class="form-control">
                                    <option v-for="payment in payments" v-bind:value="payment.value">
                                        By {{ payment.description }}
                                    </option>
                                </select>
                                <has-error :form="form" field="payment" />
                            </div>
                        </div>
                    </card>
                </div>

            </div>
            <div class="row">
                <div class="col-lg-12 mt-5 mb-5">
                    <card title="Summary">
                        Products subtotal: <b>{{prods_total_format}}</b><br/>
                        Delivery price: <b>{{delivery_price_format}}</b><br/>
                        Total: <b>
                            <money-format :value="parseFloat(prods_total+delivery_price)"
                                      :currency-code='currency'
                                      :subunit-value=true
                                      :hide-subunits=false>
                            </money-format>
                        </b>

                        <div class="form-group row">
                            <div class="col-md-7 d-flex">
                                <v-button :loading="form.busy" class="mt-3">
                                    Confirm
                                </v-button>
                            </div>
                        </div>
                    </card>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import Form from 'vform'
    import axios from "axios";
    import MoneyFormat from 'vue-money-format'

    export default {
        layout: 'auth',

        head () {
            return { title: "Checkout" }
        },

        components: {
            'money-format': MoneyFormat
        },

        data: () => ({
            cart: [],
            deliveries: [],
            payments: [],
            delivery_price: 0,
            delivery_price_format: 0,
            prods_total: 0,
            prods_total_format: 0,
            form: new Form({
                name: '',
                email: '',
                phone: '',
                address: '',
                delivery: 1,
                payment: 1
            })
        }),

        computed: mapGetters({
            authenticated: 'auth/check',
            inCart: 'cart/cart',
            currency: "currency/currency"
        }),

        mounted() {
            this.$bus.$on('update-basket', () => {
                this.getCart();
            });

            this.$bus.$on('currency-changed', () => {
                this.getCart();

            });

            this.getDeliveries();
            this.getPayments();
            this.getCart();
        },

        methods:{
            async order()
            {
                let data;

                try {
                    const response = await this.form.post('/cart/checkout');
                    data = response.data
                } catch (e) {
                    return
                }
            },
            async getDeliveries()
            {
                let { data } = await axios.get('/deliveries');
                this.$set(this, 'deliveries', data);
            },
            async getPayments()
            {
                let { data } = await axios.get('/payments');
                this.$set(this, 'payments', data);
            },
            async calculateDelivery(id)
            {
                let { data } = await axios.post('/deliveries/'+id+"/calculate", {'items': this.inCart});
                this.$set(this, 'delivery_price', data.price);
                this.$set(this, 'delivery_price_format', data.price_format);
            },
            async getCart()
            {
                let { data } = await axios.post('/cart', {'items': this.inCart});
                this.$set(this, 'cart', data.items);
                this.$set(this, 'prods_total', data.total);
                this.$set(this, 'prods_total_format', data.total_format);

                await this.calculateDelivery(this.form.delivery);
            }
        },
        watch: {
            "form.delivery": function (newValue, oldValue) {
                this.calculateDelivery(newValue);
            }
        }
    }
</script>