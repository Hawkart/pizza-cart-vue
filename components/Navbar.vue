<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
            <router-link :to="{ name: 'welcome'}" class="navbar-brand">
                {{ appName }}
            </router-link>

            <button :aria-label="$t('toggle_navigation')" class="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarToggler"
                    aria-controls="navbarToggler" aria-expanded="false"
            >
                <span class="navbar-toggler-icon"/>
            </button>

            <div id="navbarToggler" class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <currency-dropdown/>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li>
                        <ShoppingCartMini/>
                    </li>
                    <!-- Authenticated -->
                    <li v-if="user" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-dark"
                           href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        >
                            <img :src="user.photo_url" class="rounded-circle profile-photo mr-1">
                            {{ user.name }}
                        </a>
                        <div class="dropdown-menu">
                            <router-link :to="{ name: 'settings.orders' }" class="dropdown-item pl-3">
                                {{ $t('My Orders') }}
                            </router-link>

                            <div class="dropdown-divider"/>
                            <a class="dropdown-item pl-3" href="#" @click.prevent="logout">
                                <fa icon="sign-out-alt" fixed-width/>
                                {{ $t('logout') }}
                            </a>
                        </div>
                    </li>
                    <!-- Guest -->
                    <template v-else>
                        <li class="nav-item">
                            <router-link :to="{ name: 'login' }" class="nav-link" active-class="active">
                                {{ $t('login') }}
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'register' }" class="nav-link" active-class="active">
                                {{ $t('register') }}
                            </router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex'
    import CurrencyDropdown from './CurrencyDropdown'
    import ShoppingCartMini from "./ShoppingCartMini";

    export default {
        components: {
            ShoppingCartMini,
            CurrencyDropdown
        },

        data: () => ({
            appName: process.env.appName
        }),

        computed: mapGetters({
            user: 'auth/user'
        }),

        methods: {
            async logout() {
                // Log out the user.
                await this.$store.dispatch('auth/logout')

                // Redirect to login.
                this.$router.push({name: 'login'})
            }
        }
    }
</script>

<style scoped>
    .profile-photo {
        width: 2rem;
        height: 2rem;
        margin: -.375rem 0;
    }
</style>
