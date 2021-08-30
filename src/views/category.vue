<template>
    <div class="page-home-wrap mt-4">
        <!-- tests list -->
        <b-container class="home-test-wrap">
            <div class="page-header mb-4">
                <h3>{{category.name}} </h3>
                <div class="text-muted">{{category.description}}</div>
            </div>
            <b-card-group deck>
                <b-card v-for="(test, i) in tests.data" :key="i" img-top class="shadow-sm">
                    <b-card-img :src="test.image | formatImage" :onerror="onErrorImage"></b-card-img>
                    <b-card-title class="mt-2">{{test.name}}</b-card-title>
                    <b-card-text>
                        {{ test.short_description }}
                    </b-card-text>

                    <template #footer>
                        <div class="d-flex align-items-center">
                            <small class="text-muted flex-grow-1">
                                <b-icon icon="card-checklist"></b-icon> {{test.total}}
                                <b-icon icon="clock"></b-icon> {{test.duration}}s
                            </small>
                            <b-button :href="'/test/'+test.code" size="sm" pill variant="outline-secondary" class="px-4">Start</b-button>
                        </div>
                    </template>
                </b-card>
            </b-card-group>
        </b-container>
    </div>
</template>

<script>
import { category } from "@/api/home";
// @ is an alias to /src

export default {
    name: "category",
    components: {},
    data () {
        return {
            category: {},
            tests: [],
            onErrorImage: "this.src='/images/placeholder.jpg'"
        };
    },
    filters: {
        formatImage (uri) {
            return Window.MeConfig.API_URL + uri;
        },
    },
    created () {
        this.id = this.$route.params.id;
        this.getCategory();
    },
    mounted () { },
    methods: {
        getCategory () {
            let id =  this.id;
            category(id).then((response) => {
                console.log(response);
                let { category, tests } = response;
                this.tests = tests;
                this.category = category;
            });
        },
    },
};
</script>
