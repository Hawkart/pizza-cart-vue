import Cookies from 'js-cookie'
import { cookieFromRequest } from '~/utils'

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    const token = cookieFromRequest(req, 'token')
    if (token) {
      commit('auth/SET_TOKEN', token)
    }

    const locale = cookieFromRequest(req, 'locale')
    if (locale) {
      commit('lang/SET_LOCALE', { locale })
    }

    const currency = cookieFromRequest(req, 'currency')
    if (currency) {
      commit('currency/SET_CURRENCY', { currency })
    }

    const cart = cookieFromRequest(req, 'cart')
    if (cart) {
      commit('cart/GET_CART', { cart })
    }
  },

  nuxtClientInit ({ commit }) {
    const token = Cookies.get('token')
    if (token) {
      commit('auth/SET_TOKEN', token)
    }

    const currency = Cookies.get('currency')
    if (currency) {
      commit('currency/SET_CURRENCY', { currency })
    }

    const locale = Cookies.get('locale')
    if (locale) {
      commit('lang/SET_LOCALE', { locale })
    }

    const cart = Cookies.get('cart')
    if (cart) {
      commit('cart/GET_CART', { cart })
    }
  }
}
