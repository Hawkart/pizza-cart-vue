import Cookies from 'js-cookie'

// state
export const state = () => ({
    currency: process.env.appCurrency,
    currencies: {
        'USD': '$ - USD',
        'EUR': '€ - EUR'
    }
})

// getters
export const getters = {
    currency: state => state.currency,
    currencies: state => state.currencies
}

// mutations
export const mutations = {
    SET_CURRENCY(state, {currency}) {
        state.currency = currency
    }
}

// actions
export const actions = {
    setCurrency({commit}, {currency}) {
        commit('SET_CURRENCY', {currency})

        Cookies.set('currency', currency, {expires: 365})
    }
}
