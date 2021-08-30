<template>
    <div class="navbar-wrap">
        <b-navbar toggleable="sm" type="dark" variant="metric">
            <b-navbar-brand href="#">Metric</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/">Home</b-nav-item>
                    <b-nav-item v-for="(cat, i) in categories" :key="i" :href="'/category/' + cat.id">{{ cat.name }}
                    </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>{{name || 'My'}}</em>
                        </template>
                        <b-dropdown-item v-if="!name" href="/login">Sign In</b-dropdown-item>
                        <b-dropdown-item v-else @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import store from '@/store';
import { categories } from "@/api/home";
export default {
    name: "navbar",
    props: {
        msg: String,
    },
    data () {
        return {
            categories: [],
        };
    },
    created () {
        window.vue = this;
        this.getCategories();
    },
    mounted () {
    },
    computed: {
        name () {
            return store.getters.name;
        }
    },
    methods: {
        getCategories () {
            categories().then((resonse) => {
                console.log(resonse);
                let { data } = resonse;
                this.categories = data;
            });
        },
        logout () {
            this.$store.dispatch('user/logout');
            this.$router.push('/');
        }
    },
};
</script>
<style lang="scss" scoped>
.navbar-wrap {
    width: 100%;
}
</style>
