<template>
    <div class="page-home-wrap mt-4">
        <!-- tests list -->
        <b-container class="home-test-wrap">
            <b-overlay :show="loading" spinner-variant="warning" spinner-type="grow" spinner-small rounded="sm">
            <b-card-group deck>
                <b-card v-for="(test, i) in tests" :key="i" img-top class="shadow-sm">
                    <b-card-img :src="test.image | formatImage" :onerror="onErrorImage"></b-card-img>
                    <b-card-title class="mt-2">{{test.name}}</b-card-title>
                    <b-card-text>
                        {{ test.short_description }}
                    </b-card-text>
                    <template #footer>
                        <div class="d-flex align-items-center">
                            <small class="text-muted flex-grow-1">
                                <b-icon icon="card-checklist"></b-icon> {{test.total}}
                                <b-icon icon="clock"></b-icon> {{test.duration|formatToMin}} min
                            </small>
                            <b-button :to="'/test/'+test.code" size="sm" pill variant="outline-secondary"
                                class="px-4">Start</b-button>
                        </div>
                    </template>
                </b-card>
            </b-card-group>
            </b-overlay>
        </b-container>
    </div>
</template>

<script>
import { categories, home } from "@/api/home";
// @ is an alias to /src

export default {
    name: "home",
    components: {},
    data () {
        return {
            loading: false,
            categories: [],
            tests: [],
            onErrorImage: "this.src='./images/placeholder.jpg'"
        };
    },
    filters: {
        formatImage (uri) {
            return Window.MeConfig.API_URL + uri;
        },
        formatToMin(s) {
            return (s/60).toFixed(0);
        },
    },
    created () {
        this.getCategories();
        this.getHome();
    },
    mounted () { },
    methods: {
        getHome () {
            this.loading = true;
            home().then((resonse) => {
                let { data } = resonse;
                this.tests = data;
            }).finally(() => {
                this.loading = false;
            });
        },
        getCategories () {
            categories().then((resonse) => {
                let { data } = resonse;
                this.categories = data;
            });
        },
    },
};
</script>
