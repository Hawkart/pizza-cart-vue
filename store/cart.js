import Cookies from 'js-cookie'

// state
export const state = () => ({
    cart: [],
})

// getters
export const getters = {
    cart: state => state.cart
}

// mutations
export const mutations = {
    ADD_TO_CART(state, product) {

        let exist = false;
        for (var i = 0; i < state.cart.length; i++) {
            if(state.cart[i].id===product.id)
            {
                state.cart[i].quantity+=parseInt(product.quantity);
                exist = true;
            }
        }

        if(!exist) {
            state.cart.push({"id":product.id, "quantity":product.quantity});
        }

        Cookies.set('cart', JSON.stringify(state.cart), { expires: 365 })
    },

    REMOVE_FROM_CART(state, index) {
        state.cart.splice(index, 1);
        Cookies.set('cart', JSON.stringify(state.cart), { expires: 365 })
    },

    GET_CART(state, { cart }) {
        state.cart = JSON.parse(cart)
    },

    SET_CART(state, { cart }) {
        state.cart = JSON.stringify(cart)
    },
}

// actions
export const actions = {
    addItem(context, product) {
        context.commit('ADD_TO_CART', product);
    },
    removeItem(context, index) {
        context.commit('REMOVE_FROM_CART', index);
    }
}