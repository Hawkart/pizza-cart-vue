<template>
    <div>
        <p v-if="$fetchState.pending">Fetching orders...</p>
        <p v-else-if="$fetchState.error">Error while fetching orders: {{ $fetchState.error.message }}</p>
        <div class="row mb-4" v-else
             v-for="(order, index) in orders"
             :key="order.id"
        >
            <div class="col-lg-12">
                <div class="card">

                    <div class="card-header">
                        <a data-toggle="collapse" :href="'#collapse'+order.id" role="button" aria-expanded="false"
                           :aria-controls="'collapse'+order.id">
                            Order # {{order.id}}
                        </a>

                        <div class="float-right">
                            Total: <strong>
                            <money-format :value="parseFloat(order.total_price)"
                                          :currency-code='order.currency'
                                          :subunit-value=true
                                          :hide-subunits=false>
                            </money-format>
                        </strong>
                        </div>
                    </div>

                    <div class="card-body collapse" :class="{'show': index==0}" :id="'collapse'+order.id">

                        <div class="order-detail">

                            <label>Date order:</label> {{order.created_at}}<br/>
                            <label>Email:</label> {{order.email}}<br/>

                            <label>Name:</label> {{order.name}}<br/>
                            <label>Email:</label> {{order.email}}<br/>
                            <label>Phone:</label> {{order.phone}}<br/>
                            <label>Delivery:</label> {{order.delivery.description}}<br/>
                            <label>Payment:</label> {{order.payment.description}}<br/>
                            <div v-if="order.delivery==1">
                                <label>Address:</label> {{order.address}}<br/>
                            </div>
                        </div>

                        <h6>Products</h6>
                        <table class="table" v-if="order.items.length>0">
                            <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Sum</th>
                            </tr>
                            <tr
                                    v-for="item in order.items"
                                    :key="item.id"
                            >
                                <td>
                                    <img :src="item.product.image" class="card-img-top w-50px">
                                    {{ item.product.title }}
                                </td>
                                <td>
                                    {{ item.quantity }}
                                </td>
                                <td>
                                    <money-format :value="parseFloat(item.price)"
                                                  :currency-code='order.currency'
                                                  :subunit-value=true
                                                  :hide-subunits=false>
                                    </money-format>
                                </td>
                                <td>
                                    <money-format :value="parseFloat(item.price*item.quantity)"
                                                  :currency-code='order.currency'
                                                  :subunit-value=true
                                                  :hide-subunits=false>
                                    </money-format>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right">
                                    Subtotal:
                                </td>
                                <th>
                                    <money-format :value="parseFloat(order.total_price - order.delivery_price)"
                                                  :currency-code='order.currency'
                                                  :subunit-value=true
                                                  :hide-subunits=false>
                                    </money-format>
                                </th>
                            </tr>

                            <tr>
                                <td colspan="3" class="text-right">Delivery price:</td>
                                <th>
                                    <money-format :value="parseFloat(order.delivery_price)"
                                                  :currency-code='order.currency'
                                                  :subunit-value=true
                                                  :hide-subunits=false>
                                    </money-format>
                                </th>
                            </tr>

                            <tr>
                                <td colspan="3" class="text-right">
                                    Total:
                                </td>
                                <th>
                                    <money-format :value="parseFloat(order.total_price)"
                                                  :currency-code='order.currency'
                                                  :subunit-value=true
                                                  :hide-subunits=false>
                                    </money-format>
                                </th>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import MoneyFormat from 'vue-money-format'

    export default {
        scrollToTop: false,

        middleware: 'auth',

        components: {
            'money-format': MoneyFormat
        },

        head() {
            return {title: "My orders"}
        },

        data: () => ({
            orders: [],
        }),

        async fetch() {
            let {data} = await axios.get('/orders');
            this.orders = data.data;
        },
    }
</script>
