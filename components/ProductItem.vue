<template>

    <div class="col-md-3 mb-4 d-flex align-items-stretch">
        <div class="card">
            <img :src="image" :alt="title" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">{{title }}</h5>
                <p class="card-text">{{ description }}</p>
            </div>
            <div class="card-footer">
                <span class="price">{{ price }}</span>
                <div>
                    <vue-number-input v-model="quantity" :min="1" :max="100" inline controls></vue-number-input>
                    <div class="float-right">
                        <a href="#" class="btn btn-primary" @click.prevent="addToCart(pid)">Add to cart</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import VueNumberInput from '@chenfengyuan/vue-number-input';

    export default {
        name: 'ProductItem',
        components: {
            VueNumberInput
        },
        props: ['pid', 'title', 'image', 'description', 'price'],
        data: () => ({
            quantity: 1
        }),
        methods: {
            addToCart(pid) {
                let q = this.quantity;
                this.$store.dispatch('cart/addItem', {id: pid, quantity: q});
            },
        },
    };
</script>