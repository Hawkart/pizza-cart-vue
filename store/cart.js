import Cookies from 'js-cookie'
import swal from 'sweetalert2'

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
            if(state.cart[i].id===product.id) {
                state.cart[i].quantity+=parseInt(product.quantity);
                exist = true;
            }
        }

        if(!exist) {
            state.cart.push({"id":product.id, "quantity":product.quantity});
        }

        swal.fire({
            type: 'success',
            text:  'Item has been added!',
            showConfirmButton: false,
            timer: 1500
        });

        Cookies.set('cart', JSON.stringify(state.cart), { expires: 365 })
    },

    REMOVE_FROM_CART(state, pid) {

        for (var i = 0; i < state.cart.length; i++) {
            if(state.cart[i].id===pid) {
                state.cart.splice(i, 1);
            }
        }

        Cookies.set('cart', JSON.stringify(state.cart), { expires: 365 })
    },

    SET_ITEM_CART(state, product) {

        for (var i = 0; i < state.cart.length; i++) {
            if(state.cart[i].id===product.id) {
                state.cart[i].quantity = product.quantity;
            }
        }

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
    setItem(context, product) {
        context.commit('SET_ITEM_CART', product);
    },
    removeItem(context, pid) {
        context.commit('REMOVE_FROM_CART', pid);
    }
}